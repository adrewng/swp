import { useEffect, useState } from 'react'
// import Link from 'next/link'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Search, UserRound } from 'lucide-react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import userApi from '~/apis/user.api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { toast } from 'react-toastify'

export default function UserManagement() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const [openLockModal, setOpenLockModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [lockReason, setLockReason] = useState('')

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 1000) // Đợi 1000ms sau khi người dùng ngừng nhập

    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user-list', debouncedSearchTerm],
    queryFn: () => userApi.getAllUser(debouncedSearchTerm)
  })

  const userList = userData?.data.data.users
  const totalUsers = userData?.data.data.totalUsers

  const lockUser = useMutation({
    mutationFn: ({ userId, reason }: { userId: number; reason: string }) => userApi.lockUser(userId, reason),
    onSuccess: () => {
      toast.success('Đã khóa người dùng thành công!')
      setOpenLockModal(false)
      setLockReason('')
      setSelectedUserId(null)
    },
    onError: () => {
      toast.error('Khóa người dùng thất bại')
    }
  })

  const openLockUserModal = (userId: number) => {
    setSelectedUserId(userId)
    setOpenLockModal(true)
  }
  const confirmLockUser = () => {
    if (!selectedUserId) return
    console.log('Khóa user:', selectedUserId, 'Lý do:', lockReason)
    lockUser.mutate({
      userId: selectedUserId,
      reason: lockReason
    })
  }

  if (isLoading)
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex space-x-2'>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'></span>
        </div>
      </div>
    )

  return (
    <div className='min-h-screen flex-1 bg-background'>
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* KPI Cards */}
        {/* <UserStatCards />

        <UserBarChart /> */}

        {/* Recent Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách người dùng</CardTitle>
            <CardDescription>Thông tin đăng kí </CardDescription>
            {/* Hiển thị tổng số người dùng */}
            <div className='flex items-center justify-between gap-4'>
              {/* Search Bar - Left */}
              <div className='relative flex-1 max-w-md'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Tìm kiếm theo tên...'
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value
                    setSearchTerm(value)

                    // Update URL với query param
                    if (value) {
                      navigate({
                        pathname: location.pathname,
                        search: createSearchParams({ search: value }).toString()
                      })
                    } else {
                      navigate(location.pathname)
                    }
                  }}
                  className='pl-10'
                />
              </div>

              {/* Total Users - Right */}
              <div className='flex items-center gap-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg px-4 py-2.5 border border-primary/20'>
                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-primary/10'>
                  <UserRound className='h-4 w-4 text-primary' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-xs text-muted-foreground font-medium'>Tổng người dùng</span>
                  <span className='text-lg font-bold text-primary'>{totalUsers ?? 0}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-border'>
                    <th className='text-left py-3 px-4 font-semibold'>Tên</th>
                    <th className='text-left py-3 px-4 font-semibold'>Email</th>
                    <th className='text-left py-3 px-4 font-semibold'>SĐT</th>
                    <th className='text-left py-3 px-4 font-semibold'>Trạng thái</th>
                    <th className='text-left py-3 px-4 font-semibold'>Ngày tham gia</th>
                    <th className='text-left py-3 px-4 font-semibold'>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {userList &&
                    userList.map((user) => (
                      <tr key={user.id} className='border-b border-border hover:bg-muted/50'>
                        <td className='py-3 px-4'>{user.full_name}</td>
                        <td className='py-3 px-4 text-muted-foreground'>{user.email}</td>
                        <td className='py-3 px-4'>
                          {user.phone === null ? (
                            <span className='px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                              Chưa cập nhật
                            </span>
                          ) : (
                            <span className='px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                              {user.phone}
                            </span>
                          )}
                        </td>
                        <td className='py-3 px-4'>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : user.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                        <td className='py-3 px-4 text-muted-foreground'>
                          {new Date(user.created_at).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
                        </td>
                        <td className='py-3 px-4'>
                          {user.role_id === 2 ? (
                            ''
                          ) : (
                            <button
                              onClick={() => openLockUserModal(user.id)}
                              className='px-3 py-1.5 text-xs font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors'
                            >
                              Khóa
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={openLockModal} onOpenChange={setOpenLockModal}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Khóa người dùng</DialogTitle>
            <p className='text-sm text-muted-foreground'>Nhập lý do mà bạn muốn khóa tài khoản này.</p>
          </DialogHeader>

          <div className='space-y-3 py-2'>
            <label className='text-sm font-medium'>Lý do khóa</label>
            <textarea
              value={lockReason}
              onChange={(e) => setLockReason(e.target.value)}
              className='w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-red-300'
              rows={4}
              placeholder='Nhập lý do...'
            ></textarea>
          </div>

          <div className='flex justify-end gap-3 pt-4'>
            <button
              className='px-4 py-2 rounded-md border text-sm hover:bg-gray-100'
              onClick={() => setOpenLockModal(false)}
            >
              Hủy
            </button>

            <button
              onClick={confirmLockUser}
              className='px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700'
              disabled={lockUser.isPending}
            >
              {lockUser.isPending ? 'Đang xử lý...' : 'Xác nhận khóa'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
