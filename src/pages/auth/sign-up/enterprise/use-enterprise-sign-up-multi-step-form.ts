import { useMultiStepForm } from '@/hooks/use-multi-step-form'
import type { EnterpriseSignUpSchema } from './schema'

export type StepType = 'business-data' | 'bussiness-address-data' | 'responsible-data'

export const useEnterpriseSignUpMultiStepForm = () =>
  useMultiStepForm<EnterpriseSignUpSchema, StepType>()
