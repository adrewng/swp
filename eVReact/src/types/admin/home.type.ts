export interface Dashboard {
  summary: {
    totalRevenue: number
    revenueChange: number
    activeUsers: number
    usersChange: number
    totalTransactions: number
    transactionsChange: number
    totalPost: number
    postChange: number
  }
  revenueByMonth: {
    month: string
    revenue: string
    transactions: number
  }[]
  categoryDistribution: {
    name: string
    posts: number
  }[]
}
