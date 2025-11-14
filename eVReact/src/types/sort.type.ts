export const SORT_BY = {
  RECOMMEND: 'recommend',
  PRICE: 'price',
  CREATED_AT: 'created_at'
} as const
export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY]

export const ORDER = {
  ASC: 'asc',
  DESC: 'desc'
} as const
export type Order = (typeof ORDER)[keyof typeof ORDER]

export const SORT_CHOICE_KEY = {
  RECOMMENDED: 'recommended',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  NEWEST: 'newest'
} as const
export type SortChoiceKey = (typeof SORT_CHOICE_KEY)[keyof typeof SORT_CHOICE_KEY]

export type SortOption =
  | {
      key: typeof SORT_CHOICE_KEY.RECOMMENDED
      sort_by: typeof SORT_BY.RECOMMEND
      label: string
      desc?: string
      order?: undefined
    }
  | {
      key: typeof SORT_CHOICE_KEY.PRICE_ASC | typeof SORT_CHOICE_KEY.PRICE_DESC
      sort_by: typeof SORT_BY.PRICE
      label: string
      desc?: string
      order: typeof ORDER.ASC | typeof ORDER.DESC
    }
  | {
      key: typeof SORT_CHOICE_KEY.NEWEST
      sort_by: typeof SORT_BY.CREATED_AT
      label: string
      desc?: string
      order: typeof ORDER.DESC
    }

export const SORT_OPTIONS: ReadonlyArray<SortOption> = [
  {
    key: SORT_CHOICE_KEY.RECOMMENDED,
    sort_by: SORT_BY.RECOMMEND,
    label: 'Gợi ý cho bạn',
    desc: 'Ưu tiên tin đẩy (priority), sau đó mới nhất'
  },
  {
    key: SORT_CHOICE_KEY.PRICE_ASC,
    sort_by: SORT_BY.PRICE,
    label: 'Giá: Thấp → Cao',
    order: ORDER.ASC
  },
  {
    key: SORT_CHOICE_KEY.PRICE_DESC,
    sort_by: SORT_BY.PRICE,
    label: 'Giá: Cao → Thấp',
    order: ORDER.DESC
  },
  {
    key: SORT_CHOICE_KEY.NEWEST,
    sort_by: SORT_BY.CREATED_AT,
    label: 'Mới nhất',
    desc: 'Bài đăng gần đây',
    order: ORDER.DESC
  }
] as const

export const SORT_LABEL_BY_KEY: Record<SortChoiceKey, string> = Object.fromEntries(
  SORT_OPTIONS.map((o) => [o.key, o.label])
) as Record<SortChoiceKey, string>

export const SORT_OPTION_BY_KEY: Record<SortChoiceKey, SortOption> = Object.fromEntries(
  SORT_OPTIONS.map((opt) => [opt.key, opt])
) as Record<SortChoiceKey, SortOption>
