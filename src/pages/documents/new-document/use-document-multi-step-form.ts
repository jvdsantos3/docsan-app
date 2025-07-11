import { useMultiStepForm } from '@/hooks/use-multi-step-form'
import type { NewDocumentFormSchema } from './schema'

export type StepType = 'field-config' | 'upload-documents' | 'data-extraction'

export const useDocumentMultiStepForm = () =>
  useMultiStepForm<NewDocumentFormSchema, StepType>()
