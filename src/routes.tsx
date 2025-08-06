import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './pages/_layouts/root'
import { AuthLayout } from './pages/_layouts/auth'
import { SignIn } from './pages/auth/sign-in'
import { ProfessionalSignUp } from './pages/auth/sign-up/professional'
import { EnterpriseSignUp } from './pages/auth/sign-up/enterprise'
import { Services } from './pages/services'
import { ServiceDetails } from './pages/services/service-details'
import { LandingPage } from './pages/landing-page'
import { ServicesProvider } from './contexts/services/services-provider'
import { Documents } from './pages/documents'
import { NewDocument } from './pages/documents/new-document'
import { DocumentTypes } from './pages/document-types'
import { DocumentTypesVersions } from './pages/document-types/versions'
import { BranchesActivity } from './pages/admin/branches-activity'
import { AdminLayout } from './pages/_layouts/admin'
import { CNAEs } from './pages/admin/cnaes'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />

        <Route path="sign-up">
          <Route path="professional" element={<ProfessionalSignUp />} />
          <Route path="enterprise" element={<EnterpriseSignUp />} />
        </Route>
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="branches-activity" element={<BranchesActivity />} />
        <Route path="cnae" element={<CNAEs />} />
      </Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />

        <Route path="services" element={<ServicesProvider />}>
          <Route index element={<Services />} />
          <Route path=":serviceId" element={<ServiceDetails />} />
        </Route>

        <Route path="documents" element={<Documents />} />
        <Route path="documents/new" element={<NewDocument />} />
        <Route path="document-types" element={<DocumentTypes />} />
        <Route
          path="document-types/:typeId/versions"
          element={<DocumentTypesVersions />}
        />
        <Route
          path="document-types/:typeId/versions"
          element={<DocumentTypesVersions />}
        />
      </Route>
    </Routes>
  )
}
