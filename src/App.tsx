import '@/styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { AuthProvider } from './contexts/auth/auth-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
