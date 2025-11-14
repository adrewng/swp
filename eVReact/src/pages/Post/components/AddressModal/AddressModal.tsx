import { useEffect, useState } from 'react'
import { addressApi } from '~/apis/address.api'
import Button from '~/components/Button'
import { useAddress } from '~/hooks/useAddress'
import AddressDropdown from '../AddressDropdown/AddressDropdown'

interface AddressData {
  provinceCode: number
  provinceName: string
  wardName: string
  wardCode: number
  specificAddress: string
}

interface AddressModalProps {
  onClose: () => void
  onConfirm: (address: string) => void
  defaultAddress?: string
}

export default function AddressModal({ onClose, onConfirm, defaultAddress }: AddressModalProps) {
  const [addressData, setAddressData] = useState<AddressData>({
    provinceCode: -1,
    provinceName: '',
    wardCode: -1,
    wardName: '',
    specificAddress: ''
  })
  const { provinces, wards, loading, error, loadWards } = useAddress()

  // Parse default address once
  useEffect(() => {
    const parseAddress = async () => {
      if (!defaultAddress || !defaultAddress.trim() || provinces.length === 0) return

      const parts = defaultAddress.split(',').map((part) => part.trim())
      if (parts.length < 2) return

      // Find province
      const provinceName = parts[parts.length - 1]
      const foundProvince = provinces.find((p) => p.name.toLowerCase().includes(provinceName.toLowerCase()))

      if (foundProvince) {
        setAddressData({
          provinceCode: foundProvince.code,
          provinceName: foundProvince.name,
          wardCode: -1,
          wardName: '',
          specificAddress: parts.length > 2 ? parts.slice(0, -2).join(', ') : ''
        })

        // Load wards first
        await loadWards(foundProvince.code)

        // Parse ward after wards are loaded
        const wardName = parts[parts.length - 2]
        const wards = await addressApi.getWardsByProvince(foundProvince.code)
        const foundWard = wards.find((w) => w.name.toLowerCase().includes(wardName.toLowerCase()))

        if (foundWard) {
          setAddressData((prev) => ({
            ...prev,
            wardCode: foundWard.code,
            wardName: foundWard.name
          }))
        }
      }
    }

    parseAddress()
  }, [defaultAddress, provinces, loadWards])

  const handleProvinceChange = async (provinceCode: string) => {
    const provinceCodeNum = parseInt(provinceCode)
    const selectedProvince = provinces.find((p) => p.code === provinceCodeNum)
    setAddressData({
      provinceCode: provinceCodeNum,
      provinceName: selectedProvince?.name || '',
      wardName: '',
      wardCode: 0,
      specificAddress: addressData.specificAddress
    })
    if (provinceCode) {
      await loadWards(provinceCodeNum)
    }
  }

  const handleWardChange = (wardCode: string) => {
    const wardCodeNum = parseInt(wardCode)
    const selectedWard = wards.find((w) => w.code === wardCodeNum)
    setAddressData((prev) => ({
      ...prev,
      wardCode: wardCodeNum,
      wardName: selectedWard?.name || ''
    }))
  }

  const handleSpecificAddressChange = (specificAddress: string) => {
    setAddressData((prev) => ({
      ...prev,
      specificAddress
    }))
  }

  const handleConfirm = () => {
    const addressParts = []

    if (addressData.specificAddress?.trim()) {
      addressParts.push(addressData.specificAddress.trim())
    }

    if (addressData.wardName) {
      addressParts.push(addressData.wardName)
    }

    if (addressData.provinceName) {
      addressParts.push(addressData.provinceName)
    }

    const fullAddress = addressParts.join(', ')

    if (fullAddress.trim()) {
      onConfirm(fullAddress)
      onClose()
    } else {
      console.error('No address generated!')
    }
  }

  const handleReset = () => {
    setAddressData({
      provinceCode: -1,
      provinceName: '',
      wardName: '',
      wardCode: -1,
      specificAddress: ''
    })
  }

  const isFormValid = addressData.provinceCode > 0 && addressData.wardCode > 0
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white rounded-2xl p-6 w-full max-w-md mx-4'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-semibold text-zinc-900'>Địa chỉ</h3>
          <div className='flex items-center gap-2'>
            {/* Reset button */}
            <button
              onClick={handleReset}
              className='p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-500 hover:text-zinc-700'
              title='Xóa tất cả'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </button>
            {/* Close button */}
            <button onClick={onClose} className='p-2 hover:bg-zinc-100 rounded-lg transition-colors'>
              <svg className='w-5 h-5 text-zinc-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        {/* Form */}
        <div className='space-y-4'>
          {/* Province */}
          <AddressDropdown
            label='Tỉnh, thành phố'
            placeholder='Chọn tỉnh/thành phố'
            options={provinces.map((province) => ({
              value: province.code,
              label: province.name
            }))}
            value={addressData.provinceCode}
            onChange={handleProvinceChange}
            disabled={loading}
            required
          />

          {/* Ward */}
          <AddressDropdown
            label='Phường, xã, thị trấn'
            placeholder='Chọn phường/xã'
            options={wards.map((ward) => ({
              value: ward.code,
              label: ward.name
            }))}
            value={addressData.wardCode}
            onChange={handleWardChange}
            disabled={addressData.provinceCode === -1 || loading}
            required
          />

          {/* Specific Address */}
          <div>
            <label className='block text-sm font-medium text-zinc-700 mb-2'>Địa chỉ cụ thể</label>
            <input
              type='text'
              value={addressData.specificAddress}
              onChange={(e) => handleSpecificAddressChange(e.target.value)}
              placeholder='Số nhà, tên đường...'
              className='w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent'
            />
          </div>
        </div>

        {/* Actions */}
        <div className='flex justify-end mt-6'>
          <Button
            onClick={handleConfirm}
            disabled={!isFormValid || loading}
            isLoading={loading}
            className='px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2'
          >
            <span>XONG</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
