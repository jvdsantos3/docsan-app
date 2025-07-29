import '@/styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { AuthProvider } from './contexts/auth/auth-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { Worker } from '@react-pdf-viewer/core'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <BrowserRouter>
          <AuthProvider>
            <Router />
            <Toaster />
          </AuthProvider>
        </BrowserRouter>
      </Worker>
    </QueryClientProvider>
  )
}
