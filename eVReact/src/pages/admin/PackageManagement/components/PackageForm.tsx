''

import type React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import packageApi from '~/apis/package.api'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import type { FormCreatePackage, FormUpdatePackage, Package } from '~/types/package.type'

interface PackageFormProps {
  onClose: () => void
  editingPackage?: Package | null
}

export function PackageForm({ editingPackage: editingPackage, onClose }: PackageFormProps) {
  const [formData, setFormData] = useState<FormCreatePackage>({
    name: '',
    cost: 0,
    number_of_post: 0,
    number_of_push: 0,
    product_type: '',
    description: '',
    feature: ''
  })

  const qc = useQueryClient()

  useEffect(() => {
    if (editingPackage) {
      setFormData({
        name: editingPackage.name,
        cost: Number(editingPackage.cost),
        number_of_post: Number(editingPackage.number_of_post),
        number_of_push: Number(editingPackage.number_of_push),
        product_type: editingPackage.product_type,
        description: editingPackage.description,
        feature: editingPackage.feature
      })
    }
  }, [editingPackage])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('number_of') || name === 'cost' ? Number.parseInt(value) : value
    }))
  }

  const createPackage = useMutation({
    mutationFn: (formData: FormCreatePackage) => packageApi.createPackageByAdmin(formData),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['package-admin'] })
      onClose()
    }
  })

  const updatePackage = useMutation({
    mutationFn: ({ formData, id }: { formData: FormUpdatePackage; id: number }) =>
      packageApi.updatePackageByAdmin(formData, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['package-admin'] })
      onClose()
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingPackage) {
      updatePackage.mutate({ formData, id: editingPackage.id })
      return
    }
    createPackage.mutate(formData as FormCreatePackage)
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-card rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card'>
          <h2 className='text-xl font-bold text-foreground'>{editingPackage ? 'Chỉnh Sửa Gói' : 'Thêm Gói Mới'}</h2>
          <button onClick={onClose} className='text-muted-foreground hover:text-foreground transition-colors'>
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>Tên Gói *</label>
              <Input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Ví dụ: Gói Pro'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>Loại Sản Phẩm *</label>
              <select
                name='product_type'
                value={formData.product_type}
                onChange={handleChange}
                required
                disabled={!!editingPackage}
                className={`w-full border border-input bg-background rounded-md p-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none ${
                  editingPackage ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <option value=''>-- Chọn loại sản phẩm --</option>
                <option value='vehicle'>Vehicle</option>
                <option value='battery'>Battery</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>Giá (đ) *</label>
              <Input
                type='number'
                name='cost'
                value={formData.cost}
                onChange={handleChange}
                placeholder='100000'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>Số Bài Đăng *</label>
              <Input
                type='number'
                name='number_of_post'
                value={formData.number_of_post}
                onChange={handleChange}
                placeholder='3'
                required
              />
            </div>

            {/* <div>
              <label className='block text-sm font-medium text-foreground mb-2'>Số Lần Đẩy Tin *</label>
              <Input
                type='number'
                name='number_of_push'
                value={formData.number_of_push}
                onChange={handleChange}
                placeholder='3'
                required
              />
            </div> */}
          </div>

          <div>
            <label className='block text-sm font-medium text-foreground mb-2'>Mô Tả *</label>
            <Textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Mô tả chi tiết về gói dịch vụ'
              rows={3}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-foreground mb-2'>Tính Năng *</label>
            <Textarea
              name='feature'
              value={formData.feature}
              onChange={handleChange}
              placeholder='Ví dụ: Đăng bài...'
              rows={2}
              required
            />
          </div>

          <div className='flex gap-3 justify-end pt-6 border-t border-border'>
            <Button type='button' variant='outline' onClick={onClose}>
              Hủy
            </Button>
            <Button type='submit' disabled={createPackage.isPending || updatePackage.isPending}>
              {createPackage.isPending || updatePackage.isPending
                ? 'Đang lưu...'
                : editingPackage
                  ? 'Cập Nhật'
                  : 'Thêm Gói'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
