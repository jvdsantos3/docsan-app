import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { cn } from '@/lib/utils'
import { useDocumentMultiStepForm } from '../use-document-multi-step-form'
import { Check } from 'lucide-react'

export const NewDocumentStepper = () => {
  const { activeStep, steps } = useDocumentMultiStepForm()

  return (
    <div className="mx-auto w-full space-y-8 text-center">
      <Stepper value={activeStep + 1}>
        {steps.map((step, i) => (
          <StepperItem key={step.id} step={i + 1} className="flex-1">
            <StepperTrigger className="w-full flex-col gap-2">
              <div className="space-y-0.5 px-2">
                <div className="border p-2 inline-flex items-center justify-center rounded-full border-gray-500 group-data-[state=active]/step:border-blue-1000 group-data-[state=completed]/step:border-blue-1000 text-gray-500 group-data-[state=active]/step:text-blue-1000 group-data-[state=completed]/step:text-white group-data-[state=completed]/step:bg-blue-1000">
                  {i < activeStep ? <Check /> : step.icon}
                </div>
                <StepperTitle className="font-lato font-bold text-base text-gray-500 group-data-[state=active]/step:text-blue-1000 group-data-[state=completed]/step:text-blue-1000">
                  {step.title}
                </StepperTitle>
              </div>
              <StepperIndicator
                asChild
                className={cn(
                  'bg-blue-50 h-2 w-full rounded-none data-[state=active]:bg-blue-source data-[state=completed]:bg-blue-source',
                  'group-first/step:rounded-l-full group-last/step:rounded-r-full',
                  'data-[state=active]:rounded-r-full',
                )}
              >
                <span className="sr-only">{i + 1}</span>
              </StepperIndicator>
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper>
    </div>
  )
}
