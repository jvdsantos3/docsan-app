import { useMultiStepForm } from '@/hooks/use-multi-step-form'
// import schema

export type StepType = 'field-config' | 'upload-documents' | 'data-extraction'

export const useDocumentMultiStepForm = () =>
  useMultiStepForm<unknown, StepType>()
