import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import type { EnterpriseSignUpSchema } from './schema'

export type StepType = 'business-data' | 'bussiness-address-data' | 'responsible-data'

export const useEnterpriseSignUpMultiStepForm = () =>
  useMultiStepForm<EnterpriseSignUpSchema, StepType>()
