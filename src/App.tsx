import '@/styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { AuthProvider } from './contexts/auth/auth-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { Worker } from '@react-pdf-viewer/core'
import { NuqsAdapter } from 'nuqs/adapters/react'
// import { GoogleOAuthProvider } from '@react-oauth/google'
// import { env } from '@/config/env'

const queryClient = new QueryClient()

export function App() {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <BrowserRouter>
            {/* <GoogleOAuthProvider
              clientId={env.VITE_GOOGLE_CLIENT_ID}
            > */}
              <AuthProvider>
                <Router />
                <Toaster />
              </AuthProvider>
            {/* </GoogleOAuthProvider> */}
          </BrowserRouter>
        </Worker>
      </QueryClientProvider>
    </NuqsAdapter>
  )
}
