export function isPayOSCallback(search: string) {
  const sp = new URLSearchParams(search)
  const isFromMarker =
    sp.get('provider')?.toLowerCase() === 'payos' ||
    sp.get('gateway')?.toLowerCase() === 'payos' ||
    sp.get('src')?.toLowerCase() === 'payos'

  // combo dự phòng nếu BE chưa gắn marker
  const hasOrderCode = !!sp.get('orderCode')
  const status = (sp.get('status') || '').toUpperCase()
  const hasStatusLike = ['PAID', 'CANCELLED', 'PENDING'].includes(status)
  const isCancel = sp.get('cancel') === 'true'
  const hasTxnId = !!sp.get('id') || !!sp.get('code')

  return isFromMarker || (hasOrderCode && (hasStatusLike || isCancel || hasTxnId))
}

export function cleanPayOSParams() {
  const url = new URL(window.location.href)
  ;['orderCode', 'status', 'cancel', 'code', 'id', 'provider', 'gateway', 'src'].forEach((k) =>
    url.searchParams.delete(k)
  )
  window.history.replaceState({}, '', url.pathname + (url.search ? `?${url.searchParams}` : ''))
}
