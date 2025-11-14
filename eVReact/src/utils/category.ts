import type { CategoryParent, CategoryType } from '~/types/category.type'

export function getIDBypathName(categories: CategoryParent[], slug: CategoryType) {
  return categories.find((category) => category.slug === slug)?.type ?? ''
}
