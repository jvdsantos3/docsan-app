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
import { Professionals } from './pages/admin/professionals'
import { Chat } from './pages/chat'
import { RegistryTypes } from './pages/admin/registry-types'
import { Services as ServicesManage } from './pages/admin/services'

export function Router() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />

        <Route path="sign-up">
          <Route path="professional" element={<ProfessionalSignUp />} />
          <Route path="enterprise" element={<EnterpriseSignUp />} />
        </Route>
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route path="branches-activity" element={<BranchesActivity />} />
        <Route path="cnae" element={<CNAEs />} />
        <Route path="registry-types" element={<RegistryTypes />} />
        <Route path="professionals" element={<Professionals />} />

        <Route path="services">
          <Route index element={<ServicesManage />}></Route>
        </Route>
      </Route>

      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="chat" element={<Chat />} />

        <Route path="services" element={<ServicesProvider />}>
          <Route index element={<Services />} />
          <Route path=":serviceId" element={<ServiceDetails />} />
        </Route>

        <Route path="documents">
          <Route index element={<Documents />} />
          <Route path="new" element={<NewDocument />} />
        </Route>

        <Route path="document-types">
          <Route index element={<DocumentTypes />} />
          <Route path=":typeId/versions" element={<DocumentTypesVersions />} />
        </Route>
      </Route>
    </Routes>
  )
}
