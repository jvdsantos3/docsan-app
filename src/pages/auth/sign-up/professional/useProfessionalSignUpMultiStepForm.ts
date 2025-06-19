import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import type { ProfessionalSignUpFormSchema } from './schema'

export type StepType = 'personal-data' | 'professional-data' | 'address-data'

export const useProfessionalSignUpMultiStepForm = () =>
  useMultiStepForm<ProfessionalSignUpFormSchema, StepType>()
