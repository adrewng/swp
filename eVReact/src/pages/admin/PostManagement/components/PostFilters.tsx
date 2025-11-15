import { motion } from 'framer-motion'
import { useState } from 'react'
import { omit } from 'lodash'
import { ChevronDown, Settings } from 'lucide-react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Input } from '~/components/ui/input'
import { path } from '~/constants/path'
import { cn } from '~/lib/utils'
import type { QueryConfig } from '~/pages/admin/PostManagement/PostManagement'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from '~/components/ui/dialog'

import { Label } from '~/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import serviceApi from '~/apis/service.api'
import { toast } from 'react-toastify'

const filters = [
  { label: 'All', link: '' },
  { label: 'Approved', link: 'approved' },
  { label: 'Pending', link: 'pending' },
  { label: 'Rejected', link: 'rejected' }
]

const years = [2025, 2024, 2023, 2022]

interface Props {
  queryConfig: QueryConfig
}

export default function PostFilters(props: Props) {
  const [search, setSearch] = useState('')
  const [openSetting, setOpenSetting] = useState(false)
  const [price, setPrice] = useState('50000')
  const [year, setYear] = useState(years[0])
  const [selectedType, setSelectedType] = useState<'vehicle' | 'battery'>('vehicle')

  const { queryConfig } = props
  const { status } = queryConfig
  const navigate = useNavigate()

  const isActiveStatus = (sortByStatus: string) => {
    if (sortByStatus === 'All') {
      return status === '' || !status
    }
    return status === sortByStatus.toLowerCase()
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    navigate({
      pathname: path.adminPosts,
      search: createSearchParams({
        ...queryConfig,
        search: search,
        page: '1'
      }).toString()
    })
    setSearch('')
  }

  const handleClickYear = (sortByYear: number) => {
    navigate({
      pathname: path.adminPosts,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        year: sortByYear.toString()
      }).toString()
    })
    setSearch('')
  }

  // const [active, setActive] = useState('All')
  const changeCost = useMutation({
    mutationFn: ({ serviceId, cost }: { serviceId: number; cost: number }) => serviceApi.changeCost(serviceId, cost),
    onSuccess: () => {
      toast.success('Cập nhật giá thành công!')
      setOpenSetting(false)
    },
    onError: () => {
      toast.error('Lỗi khi cập nhật giá, vui lòng thử lại!')
    }
  })

  const handleSavePrice = () => {
    const serviceId = selectedType === 'vehicle' ? 1 : 2
    const numericPrice = Number(price)

    changeCost.mutate({ serviceId, cost: numericPrice })
    console.log('💰 Giá mới mỗi lần đăng tin:', price)
    setOpenSetting(false)
  }

  return (
    <div className='flex justify-between items-center'>
      {/* LEFT: Filters */}
      <div className='w-fit max-w-[60%] bg-white p-1 rounded-xl shadow flex flex-wrap items-center gap-2'>
        {filters.map((f) => {
          const isActive = isActiveStatus(f.label)
          let searchParams
          if (f.label === 'All') {
            searchParams = createSearchParams({
              ...omit(queryConfig, ['status', 'search', 'year']),
              page: '1'
            }).toString()
          } else {
            searchParams = createSearchParams({
              ...omit(queryConfig, ['search', 'year']),
              status: f.link.toLowerCase(),
              page: '1'
            }).toString()
          }
          return (
            <Link
              key={f.label}
              to={{
                pathname: path.adminPosts,
                search: searchParams
              }}
            >
              <button
                key={f.label}
                // onClick={() => handleStatus(f.label)}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap'
                )}
              >
                {/* highlight */}
                {isActive && (
                  <motion.div
                    layoutId='activeTab'
                    className='absolute inset-0 rounded-lg bg-black z-0'
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                  />
                )}

                {/* content (luôn ở trên) */}
                <span className={cn('relative z-10', isActive ? 'text-white' : 'text-gray-500 hover:text-black')}>
                  {f.label}
                </span>
                {/* {f.badge && (
                  <Badge
                    className={cn(
                      'relative z-10 text-xs px-2 py-0.5 rounded-full',
                      isActive ? 'bg-white text-black' : 'bg-green-100 text-green-600'
                    )}
                  >
                    {f.badge}
                  </Badge>
                )} */}
              </button>
            </Link>
          )
        })}
      </div>

      {/* RIGHT: Search + Year */}
      <div className='flex items-center gap-3'>
        <div className='w-48'>
          <form onSubmit={handleSubmitSearch}>
            <Input placeholder='Search posts...' className='bg-white' onChange={handleChangeSearch} value={search} />
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='flex items-center gap-2'>
              {year} <ChevronDown className='w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {years.map((y) => (
              <DropdownMenuItem
                key={y}
                onClick={() => {
                  setYear(y)
                  handleClickYear(y)
                }}
              >
                {y}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={openSetting} onOpenChange={setOpenSetting}>
          <DialogTrigger asChild>
            <Button variant='outline' size='icon'>
              <Settings className='w-5 h-5' />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chỉnh số tiền mỗi lần đăng tin</DialogTitle>
            </DialogHeader>
            <div className='py-4 space-y-2'>
              <Label htmlFor='type'>Loại bài đăng</Label>
              <select
                id='type'
                className='w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-black'
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'vehicle' | 'battery')}
              >
                <option value='vehicle'>Xe</option>
                <option value='battery'>Pin</option>
              </select>
              <Label htmlFor='price'>Số tiền (VNĐ)</Label>
              <Input id='price' type='number' min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={() => setOpenSetting(false)}>
                Hủy
              </Button>
              <Button onClick={handleSavePrice}>Lưu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
