import { useQuery } from '@tanstack/react-query'
import postApi from '~/apis/post.api'
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'
import { Car, BatteryCharging, FileText, Clock, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PostStats() {
  const {
    data: postData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['post-stats'],
    queryFn: postApi.getNumberOfPost
  })
  const postStats = postData?.data?.data

  if (isLoading) {
    // Hiển thị một Spinner nhỏ
    return <div className='text-center p-8 text-gray-500'>Đang tải số liệu thống kê...</div>
  }

  if (isError) {
    // Hiển thị lỗi nếu không tải được dữ liệu
    return (
      <div className='p-8 text-center text-red-500 bg-red-50 rounded-xl'>
        <AlertCircle className='h-5 w-5 mx-auto mb-2' />
        <p className='text-sm'>Lỗi tải dữ liệu thống kê.</p>
      </div>
    )
  }

  const stats = [
    {
      title: 'Tổng bài đăng',
      value: postStats?.total_post ?? 0,
      icon: FileText,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Bài đăng về xe',
      value: postStats?.vehicle_post ?? 0,
      icon: Car,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Bài đăng về pin',
      value: postStats?.battery_post ?? 0,
      icon: BatteryCharging,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Bài đăng chờ duyệt',
      value: postStats?.pending_post ?? 0,
      icon: Clock,
      color: 'from-rose-500 to-pink-500'
    }
  ]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {stats.map((s, i) => {
        const Icon = s.icon
        return (
          <motion.div key={i} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
            <Card className='overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all'>
              <div className={`h-2 bg-gradient-to-r ${s.color}`} />
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm text-gray-500 font-medium'>{s.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${s.color} text-white shadow-sm`}>
                  <Icon size={18} />
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-3xl font-bold text-gray-800'>{s.value.toLocaleString('vi-VN')}</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
