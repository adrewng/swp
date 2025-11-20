import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '~/apis/auth.api'
import AuthHeader from '~/components/AuthHeader'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import bannerLogin from '~/shared/bannerLogin.png'
import { type ErrorResponse } from '~/types/util.type'
import { schema, type Schema } from '~/utils/rule'
import { getAccountBlockedReason, isAxiosAccountBlockedError, isUnprocessableEntityError } from '~/utils/util'

type FormData = Pick<Schema, 'password' | 'email'>
const loginSchema = schema.pick(['password', 'email'])

const LoginPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })

  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const [openModal, setOpenModal] = useState(false)
  const [modalReason, setModalReason] = useState<string>('')

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })

  const queryClient = useQueryClient()
  const onSubmit = handleSubmit((body) => {
    loginMutation.mutate(body, {
      onSuccess: (data) => {
        queryClient.clear()
        reset()
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        if (isUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        } else if (isAxiosAccountBlockedError(error)) {
          console.log('modal')
          const reason = getAccountBlockedReason(error)
          setModalReason(reason ?? 'Tài khoản của bạn đã bị khóa.')
          setOpenModal(true)
        }
      }
    })
  })

  return (
    <div className='min-h-screen bg-white text-zinc-900 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(37,99,235,0.06),transparent_60%)]'>
      <AuthHeader />

      <main className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-10'>
        <section className='relative w-full max-w-5xl overflow-hidden rounded-3xl p-[1px]bg-gradient-to-tr from-blue-200/40 via-indigo-200/30 to-transparent shadow-xl'>
          <div className='grid grid-cols-1 rounded-[calc(1.5rem-1px)] bg-white md:grid-cols-2'>
            {/* LEFT: image panel */}
            <div className='relative hidden md:block'>
              <img
                src={bannerLogin}
                alt='EV banner'
                className='h-full w-full object-cover transition-all duration-200'
                loading='lazy'
              />
            </div>

            {/* RIGHT: form panel */}
            <div className='flex flex-col justify-center p-8 md:p-10'>
              <header className='mb-6'>
                <h1 className='text-3xl font-bold leading-tight'>Đăng nhập</h1>
                <p className='mt-1 text-sm text-zinc-600'>Chào mừng bạn quay trở lại!</p>
              </header>
              {/* Form */}
              <form className='space-y-5' onSubmit={onSubmit} noValidate>
                <Input
                  label='Email'
                  name='email'
                  type='email'
                  placeholder='Nhập email của bạn'
                  errorMsg={errors.email?.message}
                  register={register}
                />

                <Input
                  label='Mật khẩu'
                  name='password'
                  type='password'
                  placeholder='Nhập mật khẩu'
                  errorMsg={errors.password?.message}
                  register={register}
                />

                <Button
                  type='submit'
                  disabled={loginMutation.isPending}
                  isLoading={loginMutation.isPending}
                  className='relative w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-[transform,box-shadow,background-color] hover:bg-blue-700 hover:shadow-[0_8px_24px_rgba(37,99,235,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30 active:scale-[0.98] disabled:opacity-70'
                >
                  {loginMutation.isPending ? 'Đang đăng nhập' : 'Đăng nhập'}
                </Button>
              </form>

              {/* Divider */}
              {/* <div className='relative my-6'>
                <div className='h-px bg-zinc-200' />
                <span className='absolute inset-x-0 -top-3 mx-auto w-max bg-white px-3 text-xs text-zinc-500'>
                  Hoặc
                </span>
              </div> */}
              {/* Social login (mock UI) */}
              {/* <div className='grid grid-cols-2 gap-3'>
                <button
                  type='button'
                  className='inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50'
                >
                  <img src='https://www.svgrepo.com/show/475656/google-color.svg' alt='' className='h-4 w-4' />
                  Google
                </button>
                <button
                  type='button'
                  className='inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50'
                >
                  <img src='https://www.svgrepo.com/show/452210/apple.svg' alt='' className='h-4 w-4' />
                  Apple
                </button>
              </div> */}

              {/* Links */}
              <div className='mt-6 space-y-3 text-center text-sm'>
                <a href='#' className='text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline'>
                  Quên mật khẩu?
                </a>
                <div className='text-zinc-600'>
                  Chưa có tài khoản?{' '}
                  <Link to={path.register} className='font-semibold text-blue-700 underline-offset-4 hover:underline'>
                    Đăng ký ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông báo khóa tài khoản</DialogTitle>
          </DialogHeader>

          <div className='mt-2 space-y-2'>
            <p>Tài khoản của bạn hiện đã bị khóa bởi quản trị viên. Dưới đây là lý do cụ thể:</p>

            <div className='rounded-md bg-red-50 p-3 text-red-700 border border-red-200'>{modalReason}</div>

            <p className='text-sm text-muted-foreground'>
              Nếu bạn cho rằng đây là sự nhầm lẫn hoặc cần được hỗ trợ thêm, vui lòng liên hệ bộ phận quản trị.
            </p>
          </div>

          <div className='mt-4 text-right'>
            <button
              onClick={() => setOpenModal(false)}
              className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
            >
              Đóng
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LoginPage
