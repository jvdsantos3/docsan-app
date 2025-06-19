import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useProfessionalSignUpMultiStepForm } from './useProfessionalSignUpMultiStepForm'

export const ProfessionalSignUpForm = () => {
  const { activeStep, steps } = useProfessionalSignUpMultiStepForm()
  return (
    <Tabs defaultValue={steps[0].id} value={steps[activeStep].id}>
      {steps.map((step) => (
        <TabsContent key={step.id} value={step.id}>
          {step.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
