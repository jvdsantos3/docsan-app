import { useMultiStepForm } from '@/hooks/use-multi-step-form'
// import schema

export type StepType = 'filed-config' | 'upload-documents' | 'data-extraction'

export const useDocumentMultiStepForm = () =>
  useMultiStepForm<unknown, StepType>()
