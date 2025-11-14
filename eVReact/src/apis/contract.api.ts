import type { Contract, FormContract } from '~/types/admin/contract.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const contractApi = {
  createContract(formContract: FormContract) {
    return http.post('/api/contract', formContract)
  },
  getAllContract() {
    return http.get<SuccessResponse<Contract[]>>('/api/contract')
  }
}

export default contractApi
