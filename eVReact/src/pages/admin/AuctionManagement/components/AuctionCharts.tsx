import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const revenueData = [
  { month: 'T1', revenue: 400, bids: 240 },
  { month: 'T2', revenue: 520, bids: 290 },
  { month: 'T3', revenue: 480, bids: 200 },
  { month: 'T4', revenue: 680, bids: 420 },
  { month: 'T5', revenue: 750, bids: 510 },
  { month: 'T6', revenue: 920, bids: 680 }
]

const statusData = [
  { name: 'Đang diễn ra', value: 12, color: '#3b82f6' },
  { name: 'Sắp bắt đầu', value: 8, color: '#f59e0b' },
  { name: 'Đã kết thúc', value: 28, color: '#10b981' }
]

export default function AuctionCharts() {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
      {/* Revenue Chart */}
      <div className='col-span-1 lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h3 className='mb-6 text-lg font-semibold text-slate-900'>Doanh Thu & Lượt Đấu Giá</h3>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
            <XAxis dataKey='month' stroke='#64748b' />
            <YAxis stroke='#64748b' />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Bar dataKey='revenue' fill='#3b82f6' radius={[8, 8, 0, 0]} />
            <Bar dataKey='bids' fill='#10b981' radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status Distribution */}
      <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h3 className='mb-6 text-lg font-semibold text-slate-900'>Trạng Thái Phiên</h3>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey='value'
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className='mt-4 space-y-2'>
          {statusData.map((item) => (
            <div key={item.name} className='flex items-center justify-between text-sm'>
              <div className='flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full' style={{ backgroundColor: item.color }} />
                <span className='text-slate-600'>{item.name}</span>
              </div>
              <span className='font-semibold text-slate-900'>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
