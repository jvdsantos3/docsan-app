import { useContext } from 'react'
import {
  MultiStepFormContext,
  type MultiStepFormContextData,
} from '@/contexts/multi-step-form/context'

export const useMultiStepForm = <T, S>(): MultiStepFormContextData<T, S> => {
  const context = useContext(MultiStepFormContext)
  if (!context) {
    throw new Error(
      'useMultiStepForm must be used within a MultiStepFormProvider'
    )
  }

  return context as MultiStepFormContextData<T, S>
}
