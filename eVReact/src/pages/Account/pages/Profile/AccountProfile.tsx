import { useMutation, useQuery } from '@tanstack/react-query'
import { Check, Edit2, Mail, MapPin, Shield } from 'lucide-react'
import { useContext, useMemo, useRef, useState } from 'react'
import accountApi from '~/apis/account.api'
import { ProfileSkeleton } from '~/components/skeleton'
import { AppContext } from '~/contexts/app.context'
import { setProfileToLS } from '~/utils/auth'
import ProfileOverview from './components/ProfileOverview'
// import ProfileSecurity from './components/ProfileSecurity'
import StatsProfile from './components/StatsProfile'

export default function AccountProfile() {
  // const [activeTab, setActiveTab] = useState<'overview' | 'security'>('overview')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const [isEditAvatar, setIsEditAvatar] = useState(false)
  const { setProfile } = useContext(AppContext)

  // Ảnh xem trước khi chọn file
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  // Lấy hồ sơ người dùng
  const {
    data: profileData,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => accountApi.getProfile(),
    refetchOnMount: 'always', // mount lại là refetch
    refetchOnWindowFocus: true, // focus tab là refetch (nên bật)
    refetchOnReconnect: true
  })

  // Ưu tiên dùng profileContext nếu có, fallback về profileData
  const profile = profileData?.data.data.user

  // Chọn file ảnh đại diện
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const avatar = event.target.files?.[0]
    setFile(avatar)
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  const handleEditClick = () => {
    setIsEditAvatar(!isEditAvatar)
  }

  // Upload ảnh đại diện
  const uploadAvatarMutation = useMutation({
    mutationFn: (data: FormData) => accountApi.updateAvatar(data),
    onSuccess: async (data) => {
      const user = data.data.data.user

      // Cập nhật context trước
      setProfile(user)
      setProfileToLS(user)

      // Reset file state
      setFile(undefined)
      setIsEditAvatar(false)

      // Refetch để đảm bảo đồng bộ
      await refetch()
    },
    onError: () => {
      setIsEditAvatar(false)
    }
  })

  const handleUploadAvatar = () => {
    if (!file || !profile) return
    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('full_name', profile.full_name)
    formData.append('email', profile.email as string)
    formData.append('gender', profile.gender as string)
    formData.append('phone', profile.phone as string)
    formData.append('address', profile.address as string)
    formData.append('description', profile.description as string)
    uploadAvatarMutation.mutate(formData)
  }

  if (isLoading) {
    return <ProfileSkeleton />
  }

  return (
    <div className='min-h-screen bg-white flex-1'>
      {profile && (
        <div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
          {/* Tiêu đề trang */}
          <div>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>Hồ sơ của tôi</h1>
            <p className='text-gray-600'>Quản lý thông tin cá nhân, bảo mật và thanh toán.</p>
          </div>

          {/* Khu vực đầu trang */}
          <div className='flex items-start justify-between'>
            <div className='flex items-start gap-6'>
              {/* Ảnh đại diện */}
              <div className='relative group'>
                <div className='w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 ring-2 ring-gray-200'>
                  <img
                    src={previewImage || profile.avatar || 'https://picsum.photos/32'}
                    alt='Ảnh đại diện'
                    className='w-full h-full object-cover'
                  />
                </div>
                <input
                  type='file'
                  accept='.jpg, .png, .jpeg'
                  className='hidden'
                  ref={fileInputRef}
                  onChange={onFileChange}
                />

                {!isEditAvatar ? (
                  <button
                    className='absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-all shadow-lg'
                    onClick={() => {
                      handleEditClick()
                      handleUpload()
                    }}
                    aria-label='Chọn ảnh đại diện'
                  >
                    <Edit2 size={14} />
                  </button>
                ) : (
                  <button
                    className='absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-all shadow-lg'
                    onClick={() => {
                      handleEditClick()
                      handleUploadAvatar()
                    }}
                    aria-label='Lưu ảnh đại diện'
                  >
                    <Check size={14} />
                  </button>
                )}
              </div>

              {/* Tên & trạng thái */}
              <div>
                <div className='flex items-center gap-3 mb-2'>
                  <h1 className='text-3xl font-bold text-gray-900'>{profile.full_name}</h1>
                  {profile.verificationStatus && (
                    <div className='flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full'>
                      <Shield className='w-4 h-4 text-gray-900' />
                      <span className='text-xs font-medium text-gray-900'>Đã xác minh</span>
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-6 text-sm text-gray-600'>
                  {profile.address && (
                    <span className='flex items-center gap-1.5'>
                      <MapPin className='w-4 h-4' />
                      {profile.address}
                    </span>
                  )}
                  {profile.email && (
                    <span className='flex items-center gap-1.5'>
                      <Mail className='w-4 h-4' />
                      {profile.email}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Thống kê */}
          <StatsProfile profile={profile} />

          {/* Tabs điều hướng */}
          {/* <div className='border-b border-gray-200'>
            <div className='flex gap-8'>
              {(['overview', 'security'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium transition-all relative ${
                    activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab === 'overview' ? 'Tổng quan' : 'Bảo mật'}
                  {activeTab === tab && <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900' />}
                </button>
              ))}
            </div>
          </div> */}

          {/* Nội dung theo tab */}
          {/* {activeTab === 'overview' && <ProfileOverview profile={profile} refetch={refetch} />} */}
          <ProfileOverview profile={profile} refetch={refetch} />
          {/* {activeTab === 'security' && <ProfileSecurity />} */}
        </div>
      )}
    </div>
  )
}
