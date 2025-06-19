import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useEnterpriseSignUpMultiStepForm } from './useEnterpriseSignUpMultiStepForm'

export const EnterpriseSignUpForm = () => {
  const { steps, activeStep } = useEnterpriseSignUpMultiStepForm()

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
