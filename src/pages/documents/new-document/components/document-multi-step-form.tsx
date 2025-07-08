import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useDocumentMultiStepForm } from '../use-document-multi-step-form'

export const DocumentMultiStepForm = () => {
  const { activeStep, steps } = useDocumentMultiStepForm()

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
