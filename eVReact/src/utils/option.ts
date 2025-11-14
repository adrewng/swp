import type { Option } from '~/constants/options'

export function labelFromOptions<T extends string | number>(
  options: Option<T>[],
  value: string | number,
  fallback = ''
): string {
  const hit = options.find((o) => String(o.value) === String(value))
  return hit?.label ?? fallback
}
