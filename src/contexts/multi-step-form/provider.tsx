import { useState } from 'react'
import {
  MultiStepFormContext,
  type Step,
  type MultiStepFormContextData,
} from './context'

type MultiStepFormProviderProps<T, S> = {
  children: React.ReactNode
  initialData: T
  steps: Step<S>[]
}

export const MultiStepFormProvider = <T, S extends string>({
  children,
  initialData,
  steps,
}: MultiStepFormProviderProps<T, S>) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [data, setData] = useState<T>(initialData)

  const handleSetData: MultiStepFormContextData<T, S>['setData'] = (data) => {
    setData((prevData) => ({
      ...prevData,
      ...data,
    }))
  }

  function nextStep() {
    setActiveStep((prevStep) => {
      if (prevStep >= steps.length - 1) return prevStep
      return prevStep + 1
    })
  }

  function previousStep() {
    setActiveStep((prevStep) => {
      if (prevStep <= 0) return prevStep
      return prevStep - 1
    })
  }

  return (
    <MultiStepFormContext.Provider
      value={{
        activeStep,
        setActiveStep,
        steps,
        isFirstStep: activeStep === 0,
        isLastStep: activeStep === steps.length - 1,
        nextStep,
        previousStep,
        data,
        setData: handleSetData,
      }}
    >
      {children}
    </MultiStepFormContext.Provider>
  )
}
