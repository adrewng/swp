// import Link from 'next/link'
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

import { useQuery } from '@tanstack/react-query'
import { AlertCircle, ArrowDownRight, ArrowUpRight, DollarSign, Users, Zap, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import dashboardApi from '~/apis/home.api'
import { path } from '~/constants/path'

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  href
}: {
  title: string
  value: string | number
  change: number
  icon: LucideIcon
  color?: string
  href: string
}) => (
  <Link to={href}>
    <Card className='cursor-pointer hover:shadow-lg transition-shadow'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className={`text-xs flex items-center gap-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? <ArrowUpRight className='h-3 w-3' /> : <ArrowDownRight className='h-3 w-3' />}
          {typeof change === 'number' ? Math.abs(change).toFixed(2) : change} so với tháng trước
        </p>
      </CardContent>
    </Card>
  </Link>
)

export default function Home() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApi.getDashboardInfo
  })

  const dashboard = dashboardData?.data.data

  const categoryDistribution = dashboard?.categoryDistribution ?? []
  const totalPosts = dashboard?.summary?.totalPost ?? 1 // tránh chia cho 0

  const categoryPercentData = categoryDistribution.map((item) => ({
    ...item,
    value: parseFloat(((item.posts / totalPosts) * 100).toFixed(1)),
    color:
      item.name === 'Electric Car'
        ? '#3b82f6'
        : item.name === 'Electric Motorcycle'
          ? '#10b981'
          : item.name === 'Car Battery'
            ? '#f59e0b'
            : item.name === 'Motorcycle Battery'
              ? '#ef4444'
              : '#6b7280'
  }))
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
    <div className='min-h-screen bg-background flex-1'>
      {/* Header */}
      <div className='border-b border-border bg-card'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-foreground'>Bảng điều khiển</h1>
              <p className='text-muted-foreground mt-1'>Chào mừng trở lại! Đây là tổng quan nền tảng của bạn.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* KPI Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <StatCard
            title='Tổng doanh thu'
            value={`${((dashboard?.summary.totalRevenue as number) / 1000000).toFixed(2)}M`}
            change={Number(((dashboard?.summary.revenueChange as number) / 1000000).toFixed(2))}
            icon={DollarSign}
            href={path.adminTransactions}
          />
          <StatCard
            title='Tổng người dùng'
            value={dashboard?.summary.activeUsers.toLocaleString() as string | number}
            change={dashboard?.summary.usersChange as number}
            icon={Users}
            href={path.adminUsers}
          />
          <StatCard
            title='Tổng giao dịch'
            value={dashboard?.summary.totalTransactions.toLocaleString() as string | number}
            change={dashboard?.summary.transactionsChange as number}
            icon={Zap}
            href={path.adminTransactions}
          />
          <StatCard
            title='Tổng bài đăng'
            value={`${dashboard?.summary.totalPost}`}
            change={dashboard?.summary.postChange as number}
            icon={AlertCircle}
            href={path.adminPosts}
          />
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          {/* Revenue Trend */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle>Xu hướng doanh thu</CardTitle>
              <CardDescription>Doanh thu và số lượng giao dịch hàng tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={dashboard?.revenueByMonth}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis dataKey='month' stroke='#6b7280' />
                  {/* <YAxis stroke='#6b7280' /> */}
                  //... (Bỏ qua dòng // Trong Card Revenue Trend)
                  <YAxis
                    stroke='#6b7280'
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    label={{
                      value: 'Doanh thu (Triệu VND)',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#6b7280',
                      fontSize: 12
                    }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend />
                  <Line type='monotone' dataKey='revenue' stroke='#3b82f6' strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Bài đăng theo Danh mục</CardTitle>
              <CardDescription>Phân phối bài đăng theo tỷ lệ phần trăm</CardDescription>
            </CardHeader>
            <CardContent>
              {categoryPercentData.length > 0 ? (
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Pie data={categoryPercentData} cx='50%' cy='50%' outerRadius={90} fill='#8884d8' dataKey='value'>
                      {categoryPercentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Tỷ lệ']}
                      labelFormatter={(label, payload) => {
                        // Lấy posts count từ payload nếu cần
                        const posts = payload?.[0]?.payload?.posts
                        return `${label} (${posts} bài)`
                      }}
                    />
                    {/* Thêm Legend để hiển thị tên danh mục */}
                    <Legend layout='horizontal' verticalAlign='bottom' align='center' />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className='flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500'>
                  <AlertCircle className='h-6 w-6 mb-2' />
                  <p className='text-sm'>Không có dữ liệu danh mục để hiển thị.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
