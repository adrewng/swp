export const CategoryType = {
  vehicle: 'vehicle',
  battery: 'battery',
  all: 'all',
  notFound: ''
} as const

export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType]

//type: vehicle/battery
export interface CategoryParent {
  type: CategoryType | string
  slug: CategoryType
  count?: number
  has_children?: boolean
}

//category
export interface CategoryChild {
  id: number
  typeSlug: CategoryType // slug của type
  name: string
  count?: number
}

export interface CategoryDetail {
  type: CategoryType | string
  slug: CategoryType
  count?: number
  childrens: CategoryChild[]
}

// export interface CategoryParent {
//   id: number
//   name: string
//   code: string
//   count?: number
//   has_children?: boolean
// }
// export interface CategoryChild {
//   id: number
//   category_id: number
//   name: string
//   count?: number
// }

// export interface CategoryDetail {
//   id: number
//   name: string
//   code: string
//   count?: number
//   children?: CategoryChild[]
// }
