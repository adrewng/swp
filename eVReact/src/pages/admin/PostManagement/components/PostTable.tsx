import postApi from '~/apis/post.api'
import { Badge } from '~/components/ui/badge'
import type { QueryConfig } from '~/pages/admin/PostManagement/PostManagement'
// import Button from '../Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import PaginationAdmin from '~/components/Pagination/PaginationAdmin'
import { Button } from '~/components/ui/button'
import type { PostStatus, PostType } from '~/types/post.type'
import RejectReasonModal from './RejectReasonModal/RejectReasomModal'
import PostDetailModal from './PostDetailModal'

type GetPostsResponse = Awaited<ReturnType<typeof postApi.getPostsByAdmin>>

type Props = {
  data?: GetPostsResponse
  queryConfig: QueryConfig
}
export default function PostTable(props: Props) {
  const { data, queryConfig } = props
  const [viewingPost, setViewingPost] = useState<PostType | null>(null)

  const isPendingTab = queryConfig.status === 'pending'
  console.log('post data: ', data)

  const queryClient = useQueryClient()
  const [rejectingPost, setRejectingPost] = useState<{ id: string | number; title?: string } | null>(null)
  const updateMutation = useMutation({
    mutationFn: ({ id, status, reason }: { id: string | number; status: PostStatus; reason?: string }) =>
      postApi.updatePostByAdmin(id, status, reason),
    onSuccess: (_, variables) => {
      if (variables.status === 'approved') {
        toast.success('Bài viết đã được duyệt!')
      } else if (variables.status === 'rejected') {
        toast.success('Đã từ chối bài viết!')
      }
      queryClient.invalidateQueries({ queryKey: ['posts', queryConfig] })
      setRejectingPost(null)
    },
    onError: () => {
      toast.error('Cập nhật trạng thái thất bại!')
    }
  })

  const handleApprove = (id: string | number) => {
    updateMutation.mutate({ id, status: 'approved' })
  }

  const handleOpenReject = (id: string | number, title?: string) => {
    setRejectingPost({ id, title })
  }

  const handleSubmitReject = (reason: string) => {
    if (!rejectingPost) return
    updateMutation.mutate({ id: rejectingPost.id, status: 'rejected', reason })
  }

  return (
    <div className='bg-white rounded-xl shadow overflow-hidden'>
      {data && (
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse min-w-[1000px]'>
            <thead className='bg-gray-50 text-gray-600 text-sm'>
              <tr>
                <th className='py-3 px-4 whitespace-nowrap'>Bài đăng</th>
                <th className='py-3 px-4 whitespace-nowrap'>Tiêu đề</th>
                <th className='py-3 px-4 whitespace-nowrap'>Hãng xe</th>
                <th className='py-3 px-4 whitespace-nowrap'>Tên sản phẩm</th>
                <th className='py-3 px-4 whitespace-nowrap'>Giá</th>
                <th className='py-3 px-4 whitespace-nowrap'>Ngày tạo</th>
                <th className='py-3 px-4 whitespace-nowrap'>Trạng thái</th>
                {/* <th className='py-3 px-4 whitespace-nowrap'>Ưu tiên</th> */}
                {isPendingTab && <th className='py-3 px-4 whitespace-nowrap'>Hành động</th>}
              </tr>
            </thead>
            <tbody className='text-sm'>
              {data.data.data.posts.length > 0 ? (
                data.data.data.posts.map((p) => (
                  <tr key={p.id} className='border-t hover:bg-gray-50' onClick={() => setViewingPost(p)}>
                    <td className='py-3 px-4 whitespace-nowrap font-mono text-xs'>{p.id}</td>
                    {/* Sử dụng max-w và truncate cho tiêu đề để hạn chế chiều rộng cột, kết hợp với cuộn ngang */}
                    <td className='py-3 px-4 max-w-[200px] truncate'>{p.title}</td>
                    <td className='py-3 px-4 whitespace-nowrap'>{p.product.brand}</td>
                    <td className='py-3 px-4 whitespace-nowrap'>{p.product.model}</td>

                    {/* Định dạng giá tiền tệ VND và căn phải */}
                    <td className='py-3 px-4 whitespace-nowrap font-semibold text-gray-900 text-center'>
                      {Number(p.product.price || 0).toLocaleString('vi-VN')}₫
                    </td>

                    {/* Định dạng ngày tháng, tránh ngắt dòng */}
                    <td className='py-3 px-4 whitespace-nowrap text-gray-600'>
                      {new Date(p.created_at).toLocaleDateString('vi-VN')}
                    </td>

                    {/* Trạng thái */}

                    <td className='py-3 px-4 whitespace-nowrap'>
                      {p.status === 'pending' && <Badge className='bg-yellow-100 text-yellow-700'>Đang chờ</Badge>}
                      {p.status === 'approved' && <Badge className='bg-green-100 text-green-700'>Đã duyệt</Badge>}
                      {p.status === 'rejected' && <Badge className='bg-red-100 text-red-700'>Đã từ chối</Badge>}
                      {p.status === 'banned' && <Badge className='bg-gray-200 text-gray-800'>Bị cấm</Badge>}
                      {p.status === 'sold' && <Badge className='bg-blue-100 text-blue-700'>Đã bán</Badge>}
                      {p.status === 'auctioned' && <Badge className='bg-purple-100 text-purple-700'>Đã đấu giá</Badge>}
                    </td>

                    {/* Ưu tiên */}
                    {/* <td className='py-3 px-4 whitespace-nowrap'>
                      {p.priority ? (
                        <Badge className='bg-purple-100 text-purple-700'>Ưu tiên {p.priority}</Badge>
                      ) : (
                        <Badge className='bg-gray-100 text-gray-600'>Thường</Badge>
                      )}
                    </td> */}

                    {isPendingTab && (
                      <td className='py-3 px-4 text-right whitespace-nowrap'>
                        <div className='flex justify-end gap-2'>
                          <Button
                            variant='outline'
                            className='text-green-600 border-green-600 hover:bg-green-50 h-8 px-3 text-sm'
                            onClick={() => handleApprove(p.id)}
                            disabled={updateMutation.isPending}
                          >
                            Duyệt
                          </Button>
                          <Button
                            variant='outline'
                            className='text-red-600 border-red-600 hover:bg-red-50 h-8 px-3 text-sm'
                            onClick={() => handleOpenReject(p.id, p.title)}
                            disabled={updateMutation.isPending}
                          >
                            Từ chối
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className='text-center py-10 text-gray-500'>
                    <AlertCircle className='h-6 w-6 mx-auto mb-2' />
                    Không tìm thấy bài đăng nào theo tiêu chí lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PaginationAdmin pageSize={data.data.data.pagination.page_size} queryConfig={queryConfig} />
        </div>
      )}

      <RejectReasonModal
        open={!!rejectingPost}
        onClose={() => setRejectingPost(null)}
        onSubmit={handleSubmitReject}
        submitting={updateMutation.isPending}
      />
      <PostDetailModal open={!!viewingPost} onClose={() => setViewingPost(null)} post={viewingPost} />
    </div>
  )
}
