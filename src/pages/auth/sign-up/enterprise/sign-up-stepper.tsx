import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { useEnterpriseSignUpMultiStepForm } from './useEnterpriseSignUpMultiStepForm'

export const SignUpStepper = () => {
  const { activeStep, steps } = useEnterpriseSignUpMultiStepForm()

  return (
    <Stepper defaultValue={1} value={activeStep + 1} orientation="vertical">
      {steps.map(({ id, title }, i) => (
        <StepperItem
          key={id}
          step={i + 1}
          className="relative items-start not-last:flex-1"
        >
          <StepperTrigger className="pb-28" asChild>
            <div className="flex items-start rounded pb-12 last:pb-0">
              <StepperIndicator className="bg-gray-50 text-gray-300 data-[state=active]:bg-blue-source data-[state=completed]:bg-blue-source" />
              <div className="mt-0.5 px-2 text-left">
                <StepperTitle className="font-lato font-medium">
                  {title}
                </StepperTitle>
              </div>
            </div>
          </StepperTrigger>
          {(i + 1) < steps.length && (
            <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)] group-data-[state=completed]/step:bg-gray-100" />
          )}
        </StepperItem>
      ))}
    </Stepper>
  )
}
