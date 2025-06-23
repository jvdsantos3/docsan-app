import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './pages/_layouts/root'
import { AuthLayout } from './pages/_layouts/auth'
import { SignIn } from './pages/auth/sign-in'
import { ProfessionalSignUp } from './pages/auth/sign-up/professional'
import { EnterpriseSignUp } from './pages/auth/sign-up/enterprise'
import { Services } from './pages/services'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        children: [
          {
            path: 'professional',
            element: <ProfessionalSignUp />,
          },
          {
            path: 'enterprise',
            element: <EnterpriseSignUp />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/services',
        children: [
          {
            index: true,
            element: <Services />,
          },
          {
            path: ':serviceId',
            element: <div>Service Details</div>,
          },
        ],
      },
    ],
  },
])
