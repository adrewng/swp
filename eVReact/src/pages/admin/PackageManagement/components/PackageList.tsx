/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Clock, Edit, FileText, Loader2, PackageOpen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import packageApi from '~/apis/package.api'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '~/components/ui/alert-dialog'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import type { Package } from '~/types/package.type'

interface PackageListProps {
  packages: Package[]
  loading?: boolean
  onEdit?: (pkg: any) => void
  onClose?: (pkg: any) => void
}

export default function PackageList({ packages, loading = false, onEdit }: PackageListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)

  const qc = useQueryClient()

  const deletePackage = useMutation({
    mutationFn: (id: number) => packageApi.deletePackageByAdmin(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['package-admin'] })
      setDeleteDialogOpen(false)
      setSelectedPackage(null)
    }
  })

  const handleDeleteClick = (pkg: any) => {
    setSelectedPackage(pkg)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedPackage) {
      deletePackage.mutate(selectedPackage.id)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className='flex justify-center items-center h-64'>
          <Loader2 className='animate-spin mr-2 h-6 w-6 text-primary' />
          <span className='text-muted-foreground'>Đang tải dữ liệu...</span>
        </CardContent>
      </Card>
    )
  }

  if (!packages || packages.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col justify-center items-center h-64 text-muted-foreground'>
          <PackageOpen className='h-12 w-12 mb-4 opacity-50' />
          <p className='text-lg font-medium'>Chưa có gói tin nào</p>
          <p className='text-sm'>Nhấn "Thêm Gói Mới" để tạo gói tin đầu tiên</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b bg-muted/50'>
                  <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground w-12'>#</th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground min-w-[200px]'>
                    Tên gói
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground min-w-[150px]'>Loại</th>
                  <th className='px-4 py-3 text-right text-sm font-medium text-muted-foreground'>Giá</th>
                  <th className='px-4 py-3 text-center text-sm font-medium text-muted-foreground'>Thời hạn</th>
                  <th className='px-4 py-3 text-center text-sm font-medium text-muted-foreground'>Số tin</th>
                  {/* <th className='px-4 py-3 text-center text-sm font-medium text-muted-foreground'>Đẩy tin</th> */}
                  <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground min-w-[250px]'>
                    Tính năng
                  </th>
                  <th className='px-4 py-3 text-center text-sm font-medium text-muted-foreground w-[120px]'>
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg: Package, index: number) => (
                  <tr key={pkg.id} className='border-b hover:bg-muted/30 transition-colors duration-150'>
                    <td className='px-4 py-4 text-center text-sm font-medium text-muted-foreground'>{index + 1}</td>

                    <td className='px-4 py-4'>
                      <div className='flex flex-col gap-1'>
                        <span className='font-semibold text-foreground text-sm'>{pkg.name}</span>
                        {pkg.description && (
                          <span className='text-xs text-muted-foreground line-clamp-1'>{pkg.description}</span>
                        )}
                      </div>
                    </td>

                    <td className='px-4 py-4'>
                      <Badge variant='outline' className='font-normal text-xs'>
                        {pkg.product_type}
                      </Badge>
                    </td>

                    <td className='px-4 py-4 text-right'>
                      <div className='flex items-center justify-end gap-1'>
                        <span className='font-semibold text-foreground text-sm'>
                          {Number(pkg.cost).toLocaleString()}
                        </span>
                        <span className='text-xs text-muted-foreground'>đ</span>
                      </div>
                    </td>

                    <td className='px-4 py-4 text-center'>
                      <div className='flex items-center justify-center gap-1'>
                        <Clock className='h-3.5 w-3.5 text-blue-600' />
                        <span className='text-sm'>{pkg.duration}</span>
                        <span className='text-xs text-muted-foreground'>ngày</span>
                      </div>
                    </td>

                    <td className='px-4 py-4 text-center'>
                      <Badge variant='secondary' className='font-mono text-xs'>
                        {pkg.number_of_post} tin
                      </Badge>
                    </td>
                    {/* 
                    <td className='px-4 py-4 text-center'>
                      <Badge variant='secondary' className='font-mono text-xs'>
                        {pkg.number_of_push} lượt
                      </Badge>
                    </td> */}

                    <td className='px-4 py-4'>
                      <div className='flex items-start gap-1.5'>
                        <FileText className='h-3.5 w-3.5 text-purple-600 mt-0.5 flex-shrink-0' />
                        <span className='text-xs text-muted-foreground line-clamp-2'>{pkg.feature}</span>
                      </div>
                    </td>

                    <td className='px-4 py-4'>
                      <div className='flex items-center justify-center gap-1'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                          onClick={() => {
                            onEdit?.(pkg)
                            setSelectedPackage(pkg)
                          }}
                          title='Chỉnh sửa'
                        >
                          <Edit className='h-4 w-4' />
                        </Button>

                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50'
                          onClick={() => handleDeleteClick(pkg)}
                          title='Xóa'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa gói tin</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa gói tin <strong className='text-foreground'>{selectedPackage?.name}</strong>?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className='bg-red-600 hover:bg-red-700'
              disabled={deletePackage.isPending}
            >
              {deletePackage.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Đang xoá...
                </>
              ) : (
                'Xóa'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
