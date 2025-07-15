import type { Step } from '@/contexts/multi-step-form/context'
import type { StepType } from './use-enterprise-sign-up-multi-step-form'
import { CompanyInfo } from './components/company-info'
import { CompanyAddressInfo } from './components/company-address-info'
import { ResponsibleInfo } from './components/owner-info'


export const steps: Step<StepType>[] = [
  {
    id: 'business-data',
    title: 'Dados da empresa',
    content: <CompanyInfo />,
  },
  {
    id: 'bussiness-address-data',
    title: 'Endereço comercial',
    content: <CompanyAddressInfo />,
  },
  {
    id: 'responsible-data',
    title: 'Responsável',
    content: <ResponsibleInfo />,
  },
]