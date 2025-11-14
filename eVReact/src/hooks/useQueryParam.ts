import { useSearchParams } from 'react-router-dom'

export default function useQueryParam() {
  const [searchParam] = useSearchParams()
  return Object.fromEntries([...searchParam])
}
