// based on https://dev.to/mahdiabdalkareem/building-a-dynamic-multi-step-form-with-a-generic-stepper-component-in-react-h6a

import { createContext } from 'react'

export type MultiStepFormContextData<T, S> = {
  activeStep: number
  setActiveStep: (step: number) => void
  steps: Step<S>[]
  isFirstStep: boolean
  isLastStep: boolean
  nextStep: () => void
  previousStep: () => void
  data: T
  setData: (data: Partial<T>) => void
}

export type Step<S> = {
  id: S
  title: string
  content: React.ReactNode
}

export const MultiStepFormContext = createContext<
  MultiStepFormContextData<unknown, unknown> | undefined
>(undefined)
