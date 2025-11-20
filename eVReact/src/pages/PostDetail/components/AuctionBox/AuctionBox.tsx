/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock, Gavel, Minus, Plus, Zap } from 'lucide-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { io, Socket } from 'socket.io-client'
import auctionApi from '~/apis/auction.api'
import { AppContext } from '~/contexts/app.context'
import type { Auction } from '~/types/auction.type'
import { JoinABidButton } from './JoinABidButton'

const SERVER_URL = import.meta.env.VITE_API_URL

interface ButtonProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  className,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}: ButtonProps & Record<string, unknown>) => {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

interface AuctionBoxProps {
  product_id: string
  auctionData: Auction
}


export default function AuctionBox({ auctionData }: AuctionBoxProps) {
  const { profile } = useContext(AppContext)

  /* ------------------------------------------------------------
   * STATE
   * ------------------------------------------------------------ */
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const [isLive, setIsLive] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const [winnerId, setWinnerId] = useState<number | null>(null)

  // refs
  const hasJoinedRef = useRef(false)
  const timeLeftRef = useRef(0)
  const currentPriceRef = useRef(0)

  // UI
  const [_, setHasJoinedUI] = useState(false)
  const [timeLeftUI, setTimeLeftUI] = useState(0)
  const [currentPriceUI, setCurrentPriceUI] = useState(0)
  const [bidAmount, setBidAmount] = useState(0)

  const token = localStorage.getItem('access_token')?.replace('Bearer ', '')
  const auctionId = auctionData?.id

  const step = Number(auctionData?.step || 0)
  const startingPrice = Number(auctionData?.starting_price || 0)
  const targetPrice = Number(auctionData?.target_price || 0)
  const deposit = Number(auctionData?.deposit || 0)

  /* ============================================================
   * 1. INIT SOCKET (không return gì → fix build)
   * ============================================================ */
  useEffect(() => {
    if (!token) return

    const s: Socket = io(`${SERVER_URL}/auction`, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true
    })

    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [token])

  /* ============================================================
   * 2. SOCKET HANDLERS
   * ============================================================ */
  useEffect(() => {
    if (!socket || !auctionId) return

    /* ---------------- CONNECT ---------------- */
    const onConnect = () => {
      setIsConnected(true)
      socket.emit('auction:join', { auctionId }) // join 1 lần duy nhất khi connect
    }

    const onDisconnect = () => {
      setIsConnected(false)
      hasJoinedRef.current = false
      setHasJoinedUI(false)
    }

    /* ---------------- AUCTION INFO ---------------- */
    const onAuctionInfo = (data: any) => {
      if (data.remainingTime === -1 && data.status !== 'live') {
        setIsLive(false)
        setIsEnded(false)

        hasJoinedRef.current = false
        setHasJoinedUI(false)

        setTimeLeftUI(0)
        setWinnerId(null)

        toast.info(data.message || 'Phiên đấu giá chưa bắt đầu')
        return
      }
    }

    /* ---------------- LIVE ---------------- */
    const onLive = (data: any) => {
      setIsLive(true)

      currentPriceRef.current = Number(data.auction?.winning_price || startingPrice)
      setCurrentPriceUI(currentPriceRef.current)

      timeLeftRef.current = data.remainingTime
      setTimeLeftUI(data.remainingTime)

      setWinnerId(data.auction?.winner_id || null)
    }

    /* ---------------- JOINED ---------------- */
    const onJoined = (data: any) => {
      hasJoinedRef.current = true
      setHasJoinedUI(true)

      currentPriceRef.current = Number(data.auction?.winning_price || startingPrice)
      setCurrentPriceUI(currentPriceRef.current)

      timeLeftRef.current = data.remainingTime
      setTimeLeftUI(data.remainingTime)

      setWinnerId(data.auction?.winner_id || null)

      toast.success('Đã tham gia đấu giá!')
    }

    /* ---------------- NEED DEPOSIT ---------------- */
    const onNeedDeposit = (data: any) => {
      currentPriceRef.current = Number(data.auction?.winning_price || startingPrice)
      setCurrentPriceUI(currentPriceRef.current)

      timeLeftRef.current = data.remainingTime
      setTimeLeftUI(data.remainingTime)

      setWinnerId(data.auction?.winner_id || null)

      toast.info(data.message || 'Bạn cần đặt cọc để tham gia')
    }

    /* ---------------- BID UPDATE ---------------- */
    const onBidUpdate = (data: any) => {
      currentPriceRef.current = Number(data.winningPrice)
      setCurrentPriceUI(currentPriceRef.current)

      if (data.remainingTime !== undefined) {
        timeLeftRef.current = data.remainingTime
        setTimeLeftUI(data.remainingTime)
      }

      setWinnerId(data.winnerId)
    }

    /* ---------------- TIME UPDATE ---------------- */
    const onTimeUpdate = (data: any) => {
      timeLeftRef.current = data.remainingTime
      setTimeLeftUI(data.remainingTime)
    }

    /* ---------------- CLOSED ---------------- */
    const onClosed = (data: any) => {
      setIsEnded(true)
      setWinnerId(data.winnerId)

      timeLeftRef.current = 0
      setTimeLeftUI(0)
       if (hasJoinedRef.current === true) {
        if (data.winnerId === profile?.id) {
          toast.success('🏆 Chúc mừng! Bạn đã thắng đấu giá!')
        } else if (data.winnerId) {
          toast.info(`Đấu giá đã kết thúc. Người thắng: User ${data.winnerId}`)
        } else {
          toast.info('Đấu giá đã kết thúc mà không có người thắng')
        }
      } else {
        toast.info('Đấu giá đã kết thúc')
      }
    }

    /* ---------------- ERROR ---------------- */
    const onError = (data: any) => {
      toast.error(data?.message || 'Có lỗi xảy ra')
    }

    /* REGISTER EVENTS */
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('auction:info', onAuctionInfo)
    socket.on('auction:live', onLive)
    socket.on('auction:joined', onJoined)
    socket.on('auction:needDeposit', onNeedDeposit)
    socket.on('auction:bid_update', onBidUpdate)
    socket.on('auction:time_update', onTimeUpdate)
    socket.on('auction:closed', onClosed)
    socket.on('auction:error', onError)

    /* CLEANUP */
    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('auction:info', onAuctionInfo)
      socket.off('auction:live', onLive)
      socket.off('auction:joined', onJoined)
      socket.off('auction:needDeposit', onNeedDeposit)
      socket.off('auction:bid_update', onBidUpdate)
      socket.off('auction:time_update', onTimeUpdate)
      socket.off('auction:closed', onClosed)
      socket.off('auction:error', onError)
    }
  }, [socket, auctionId, startingPrice])

  /* ============================================================
   * 3. LOCAL COUNTDOWN
   * ============================================================ */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isEnded && timeLeftRef.current > 0) {
        timeLeftRef.current--
        setTimeLeftUI(timeLeftRef.current)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isEnded])

  /* ============================================================
   * 4. DEFAULT BID
   * ============================================================ */
  useEffect(() => {
    const minBid =
      currentPriceRef.current > 0
        ? currentPriceRef.current + step
        : startingPrice

    setBidAmount(minBid)
  }, [currentPriceUI, startingPrice, step])

  /* ============================================================
   * 5. HANDLERS
   * ============================================================ */
  const handlePlaceBid = () => {
    if (!socket || !isConnected) return toast.error('Chưa kết nối')
    if (!hasJoinedRef.current) return toast.error('Bạn cần tham gia trước')

    const minBid = currentPriceRef.current + step
    if (bidAmount < minBid)
      return toast.error(`Giá đặt phải lớn hơn ${minBid.toLocaleString('vi-VN')}đ`)

    socket.emit('auction:bid', { auctionId, bidAmount })
  }

  const handleBuyNow = async () => {
    if (!isConnected) return toast.error('Chưa kết nối')
    if (!hasJoinedRef.current) return toast.error('Bạn cần đặt cọc')
    if (!auctionId) return

    try {
      await auctionApi.buyNow(auctionId)
      setIsEnded(true)
      setWinnerId(profile?.id || null)
      toast.success('Mua ngay thành công!')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Không thể mua ngay')
    }
  }

  /* ============================================================
   * 6. UI
   * ============================================================ */

  const minutes = Math.floor(timeLeftUI / 60)
  const seconds = timeLeftUI % 60


  return (
    <div className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
      {/* Header */}
      <div className='mb-4 flex items-center gap-2'>
        <Gavel className='h-5 w-5 text-zinc-900' />
        <h2 className='text-lg font-semibold'>Đấu giá</h2>

        <div className='ml-auto flex items-center gap-2'>
          <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className='text-xs text-zinc-500'>{isConnected ? 'Online' : 'Offline'}</span>
        </div>
      </div>

      {/* Countdown */}
      <div className='pb-3'>
        <div className='mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500'>
          <Clock className='h-4 w-4' />
          <span>Thời gian còn lại</span>
        </div>

        {!isEnded ? (
          <div className='flex items-center justify-center gap-3'>
            <div className='flex flex-col items-center'>
              <div className='text-zinc-900 rounded-2xl w-25 h-18 flex flex-col items-center justify-center border border-black '>
                <span className='text-4xl font-semibold tabular-nums'>
                  {String(minutes).padStart(2, '0')}
                </span>
                <span className='text-xs text-zinc-500 mt-1.5 font-medium'>Phút</span>
              </div>
            </div>

            <span className='text-2xl font-bold text-zinc-900 mb-6'>:</span>

            <div className='flex flex-col items-center'>
              <div className='text-zinc-900 rounded-2xl w-25 h-18 flex flex-col items-center justify-center border border-black '>
                <span className='text-4xl font-semibold tabular-nums'>
                  {String(seconds).padStart(2, '0')}
                </span>
                <span className='text-xs text-zinc-500 mt-1.5 font-medium'>Giây</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center text-xl font-bold text-red-600'>
            Đấu giá đã kết thúc
            {winnerId && (
              <p className='text-sm mt-2 text-zinc-700'>
                🏆 Người thắng: {winnerId === profile?.id ? 'Bạn' : `User ${winnerId}`}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Price Info */}
      {!isEnded ? (
        <>
          <hr className='my-4 border-zinc-900 pb-2' />
          <div className='mb-5 space-y-2 text-sm'>
            <div className='flex items-center justify-between text-zinc-600'>
              <span>Giá khởi điểm:</span>
              <span className='font-bold text-lg text-zinc-900'>
                {startingPrice.toLocaleString('vi-VN')}đ
              </span>
            </div>

            <div className='flex items-center justify-between text-zinc-600'>
              <span>Bước nhảy:</span>
              <span className='font-bold text-lg text-zinc-900'>
                {step.toLocaleString('vi-VN')}đ
              </span>
            </div>

            <div className='flex items-center justify-between border-t border-zinc-100 pt-2'>
              <span className='text-zinc-600'>Giá hiện tại:</span>
              <span className='text-xl font-bold text-emerald-600'>
                {currentPriceUI > 0
                  ? currentPriceUI.toLocaleString('vi-VN')
                  : startingPrice.toLocaleString('vi-VN')}đ
              </span>
            </div>

            {winnerId && (
              <div className='flex items-center justify-between text-zinc-600'>
                <span>Người dẫn đầu:</span>
                <span className='font-semibold text-zinc-900'>
                  {winnerId === profile?.id ? 'Bạn 🏆' : `User ${winnerId}`}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        ''
      )}

      <hr className='my-4 border-zinc-900 pt-3' />

      {/* Bid Input */}
      {!isEnded ? (
        <>
          <div className='mb-4'>
            <label className='mb-2 block text-xs uppercase tracking-wide text-zinc-500'>
              Giá đặt của bạn
            </label>

            <div className='flex items-stretch gap-2'>
              <Button
                onClick={() => {
                  const minBid =
                    currentPriceRef.current > 0
                      ? currentPriceRef.current + step
                      : startingPrice

                  setBidAmount(prev => Math.max(prev - step, minBid))
                }}
                disabled={!isConnected || !hasJoinedRef.current || !isLive}
                className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-300 bg-white shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <Minus className='h-4 w-4 text-zinc-700' />
              </Button>

              <div className='flex flex-1 items-center justify-center rounded-xl border border-zinc-300 bg-white px-3 shadow-sm'>
                <input
                  type='text'
                  value={bidAmount.toLocaleString('vi-VN')}
                  readOnly
                  className='w-full bg-transparent text-center text-base font-semibold text-zinc-900 outline-none'
                />
              </div>

              <Button
                onClick={() => setBidAmount(prev => prev + step)}
                disabled={!isConnected || !hasJoinedRef.current || !isLive}
                className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-300 bg-white shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <Plus className='h-4 w-4 text-zinc-700' />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='space-y-2'>
            {!hasJoinedRef.current && (
              <JoinABidButton
                deposit={String(deposit)}
                auction_id={auctionId}
                socket={socket}
                disabled={!isConnected || isEnded || !isLive} 
              />
            )}

            <Button
              onClick={handlePlaceBid}
              disabled={!isConnected || !hasJoinedRef.current}
              className='flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white shadow-sm transition hover:translate-y-[-1px] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50'
            >
              <Gavel className='h-5 w-5' />
              {!isConnected ? 'Đang kết nối...' : !hasJoinedRef.current ? 'Vui lòng nộp tiền cọc' : 'Đặt giá'}
            </Button>

            <Button
              onClick={handleBuyNow}
              disabled={!isConnected || !hasJoinedRef.current}
              className='flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <Zap className='h-5 w-5' />
              Mua ngay • {targetPrice.toLocaleString('vi-VN')}đ
            </Button>
          </div>
        </>
      ) : (
        <div className='text-center p-4 bg-zinc-50 rounded-xl'>
          <p className='text-zinc-600 mb-2'>Đấu giá đã kết thúc</p>
          {winnerId === profile?.id && <p className='text-emerald-600 font-semibold'>🎉 Chúc mừng bạn đã thắng!</p>}
        </div>
      )}
    </div>
  )
}
