// import Link from 'next/link'

import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'

export default function UserStatCards() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Tổng người dùng</CardDescription>
          <CardTitle className='font-semibold tabular-nums text-3xl'>3412</CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Tăng trưởng trong tháng này <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Lượt truy cập trong 6 tháng gần đây</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Người dùng mới tháng này</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>1,234</CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Giảm 20% so với kỳ trước <IconTrendingDown className='size-4' />
          </div>
          <div className='text-muted-foreground'>Kênh thu hút cần được chú ý</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Tài khoản hoạt động</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>45,678</CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Giữ chân người dùng tốt <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Mức độ tương tác vượt mục tiêu</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Người dùng đã xác minh</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>4.5%</CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Hiệu suất tăng đều <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Đúng với dự báo tăng trưởng</div>
        </CardFooter>
      </Card>
    </div>
  )
}
