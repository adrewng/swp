import type { CategoryDetail, CategoryParent, CategoryType } from '~/types/category.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL = 'api/category'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<CategoryParent[]>>(`${URL}/get-all`)
  },
  getCategoryBySlug(slug: CategoryType) {
    return http.get<SuccessResponse<CategoryDetail>>(`${URL}/${slug}`)
  },
  getCategoryDetailList() {
    return http.get<SuccessResponse<CategoryDetail[]>>(`${URL}/detail-all`)
  }
}
export default categoryApi
