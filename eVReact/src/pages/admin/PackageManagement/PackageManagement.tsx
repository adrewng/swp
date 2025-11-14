import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import packageApi from '~/apis/package.api'
import { Button } from '~/components/ui/button'
import type { Package } from '~/types/package.type'
import { PackageForm } from './components/PackageForm'
import PackageList from './components/PackageList'

export default function PackageManagment() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)

  const { data: packageData, isLoading } = useQuery({
    queryKey: ['package-admin'],
    queryFn: packageApi.getPackageByAdmin
  })
  const packages = packageData?.data.data

  const handleEditPackage = (pkg: Package) => {
    setSelectedPackage(pkg)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
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
    <main className='min-h-screen bg-background flex-1'>
      <div className='container mx-auto py-8 px-4'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Quản lý Gói Tin</h1>
            <p className='text-muted-foreground mt-2'>Quản lý và cập nhật các gói dịch vụ của hệ thống</p>
          </div>
          <Button
            onClick={() => {
              setIsFormOpen(true)
            }}
            className='gap-2'
          >
            <Plus className='w-4 h-4' />
            Thêm Gói Mới
          </Button>
        </div>
        {packages && (
          <>
            <PackageList packages={packages} loading={isLoading} onClose={handleCloseForm} onEdit={handleEditPackage} />
            {isFormOpen && <PackageForm editingPackage={selectedPackage} onClose={handleCloseForm} />}
          </>
        )}
      </div>
    </main>
  )
}
