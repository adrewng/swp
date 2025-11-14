import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll lên đầu trang khi route thay đổi
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // smooth scroll để mượt hơn
    })
  }, [pathname])

  return null
}
