export interface User {
  id: number
  full_name: string
  avatar?: string
  phone?: string
  email?: string
  address?: string
  gender?: string
  cccd?: string
  date_Of_birth?: string
  description?: string
  role?: string

  rating?: number
  totalCredit?: string
  status?: string
  verificationStatus?: boolean
  isVerify?: boolean

  createdAt?: string
  updateAt?: string

  totalPosts?: number
  totalActivePosts?: number
  totalSoldPosts?: number
  totalTransactions?: number
  totalFeedbacks?: number

  recentTransactions?: {
    description: string
    date: string
    amount: number
  }[]
  paymentMethod?: {
    cardType: string
    cardHolder: string
    cardNumber: string
    expiry: string
    balance: number
  }
}

// export interface ProfileData {
//   user: {
//     full_name: string
//     dateOfBirth: string
//     gender: string
//     address: string
//     avatar: string
//     email: string
//     phone: string
//     balance: number
//     verificationStatus: string | boolean
//     total_posts: number
//     total_transactions: number
//     total_credit: string

//     recentTransactions: {
//       description: string
//       date: string
//       amount: number
//     }[]
//     paymentMethod: {
//       cardType: string
//       cardHolder: string
//       cardNumber: string
//       expiry: string
//       balance: number
//     }
//   }
//   refresh_token: string
// }

export interface UserGetByAdmin {
  id: number
  status: string
  full_name: string
  email: string
  phone: string
  reputation: number
  total_credit: string
  created_at: string
  role_id: number
  refresh_token: string
}

export interface UserListGetByAdmin {
  totalUsers: number
  users: UserGetByAdmin[]
}

export interface BodyUpdateProfile {
  full_name: string
  gender?: '' | 'Nam' | 'Nữ' | 'Khác'
  phone: string
  email: string
  address?: string
  avatar?: string
  description?: string
}
