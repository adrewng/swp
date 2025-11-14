import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { persistQueryClient, removeOldestQuery } from '@tanstack/react-query-persist-client'
import { compress, decompress } from 'lz-string'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import AppProvider from './contexts/app.context.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1
    }
  }
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  // giảm kích thước lưu trữ
  serialize: (client) => compress(JSON.stringify(client)),
  deserialize: (str) => JSON.parse(decompress(str)),

  // nếu đầy bộ nhớ, bỏ query cũ nhất rồi thử lại
  // (cũng có thể tự viết retryer riêng)
  retry: removeOldestQuery,
  throttleTime: 1000 // tránh spam ghi storage
})

persistQueryClient({
  queryClient,
  persister,
  dehydrateOptions: {
    shouldDehydrateQuery: (q) => {
      const k = q.queryKey
      // ✅ CHỈ lưu các key bạn cho phép
      const allow = [['categories']]
      return allow.some((allowed) => allowed.every((seg, i) => k[i] === seg))
    },
    //  KHÔNG lưu mutation
    shouldDehydrateMutation: () => false
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
