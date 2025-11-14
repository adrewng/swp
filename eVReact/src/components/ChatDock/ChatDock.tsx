import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Minus, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import aiApi from '~/apis/ai.api'

type Msg = { id: string; role: 'user' | 'assistant' | 'system'; text: string }

export default function ChatDock() {
  const [open, setOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<Msg[]>([
    { id: 'hello', role: 'assistant', text: 'Chào bạn! Mình có thể giúp gì hôm nay?' }
  ])
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => controllerRef.current?.abort()
  }, [])

  const handleSend = async () => {
    const text = draft.trim()
    if (!text || isSending) return

    setErrorText(null)
    setDraft('')

    // 1) thêm tin người dùng
    const userMsg: Msg = { id: crypto.randomUUID(), role: 'user', text }
    setMessages((m) => [...m, userMsg])

    // 2) hủy request cũ & tạo controller mới
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    // 3) bubble "đang soạn…"
    const typingId = crypto.randomUUID()
    setMessages((m) => [...m, { id: typingId, role: 'assistant', text: 'Đang soạn trả lời…' }])
    setIsSending(true)

    try {
      const res = await aiApi.getAnswer(text, controller.signal)
      const answer = res.data.answer
      // 4) thay bubble
      setMessages((m) =>
        m.map((msg) => (msg.id === typingId ? { id: crypto.randomUUID(), role: 'assistant', text: answer } : msg))
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.name === 'CanceledError' || err?.name === 'AbortError') return
      const msg = err?.response?.data?.message ?? err?.message ?? 'Có lỗi xảy ra. Vui lòng thử lại.'
      setErrorText(msg)
      setMessages((m) =>
        m.map((msg2) =>
          msg2.id === typingId
            ? { id: crypto.randomUUID(), role: 'system', text: '⚠️ Không thể lấy câu trả lời. Thử lại sau.' }
            : msg2
        )
      )
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          'fixed bottom-5 right-5 z-[60]',
          'h-12 w-12 rounded-full shadow-xl border border-black/5',
          'bg-white hover:bg-zinc-50 transition-colors',
          'grid place-items-center'
        )}
        aria-label={open ? 'Đóng chat AI' : 'Mở chat AI'}
      >
        <MessageCircle className='h-5 w-5' />
        <span className='sr-only'>Chat AI</span>
        <span className='absolute -top-1 -right-1 text-[10px] rounded-full px-1.5 py-0.5 bg-black text-white'>AI</span>
      </button>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-[59]'
              onMouseDown={() => {
                setOpen(false)
                controllerRef.current?.abort()
              }}
            >
              <motion.div
                role='dialog'
                aria-modal='true'
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.98, opacity: 0, y: 6 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className={clsx(
                  'fixed bottom-20 right-5 pointer-events-auto',
                  'w-[19rem] h-[26rem] max-w-[92vw] max-h-[80vh] flex flex-col',
                  'rounded-2xl shadow-2xl border border-black/5 bg-white overflow-hidden'
                )}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className='flex items-center justify-between px-4 py-2 border-b'>
                  <div className='flex items-center gap-2'>
                    <div className='h-5 w-5 rounded-full bg-gradient-to-tr from-amber-300 to-emerald-300' />
                    <div className='font-medium text-sm'>EViest AI</div>
                  </div>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() => {
                        setOpen(false)
                        controllerRef.current?.abort()
                      }}
                      className='p-1.5 rounded-lg hover:bg-zinc-100'
                      aria-label='Thu nhỏ'
                      title='Thu nhỏ'
                    >
                      <Minus className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => {
                        setOpen(false)
                        controllerRef.current?.abort()
                      }}
                      className='p-1.5 rounded-lg hover:bg-zinc-100'
                      aria-label='Đóng'
                      title='Đóng'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  </div>
                </div>

                <div className='px-3 py-3 space-y-2 flex-1 overflow-y-auto'>
                  {messages.map((m) => (
                    <div key={m.id} className={clsx('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                      <div
                        className={clsx(
                          'px-3 py-2 rounded-2xl text-sm max-w-[80%] whitespace-pre-wrap',
                          m.role === 'user'
                            ? 'bg-zinc-900 text-white rounded-br-md'
                            : m.role === 'assistant'
                              ? 'bg-zinc-100 text-zinc-900 rounded-bl-md'
                              : 'bg-amber-50 text-amber-900 rounded-bl-md border border-amber-200'
                        )}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {errorText && <div className='text-xs text-red-600 px-1'>Lỗi: {errorText}</div>}
                </div>

                <div className='border-t p-2'>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSend()
                    }}
                    className='flex items-center gap-2'
                  >
                    <input
                      autoFocus
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder='Hỏi AI điều gì đó...'
                      disabled={isSending}
                      className='flex-1 rounded-xl border px-3 py-1.5 text-sm outline-none disabled:opacity-60 focus:ring-2 focus:ring-zinc-900/10'
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSend()
                        }
                      }}
                    />
                    <button
                      type='submit'
                      disabled={isSending}
                      className='inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-sm hover:bg-zinc-50 disabled:opacity-60'
                      aria-label='Gửi'
                    >
                      <Send className='h-4 w-4' />
                      Gửi
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
