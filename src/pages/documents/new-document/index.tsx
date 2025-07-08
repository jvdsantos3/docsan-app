import { Button } from '@/components/ui/button'
import { CornerUpLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { NewDocumentStepper } from './components/stepper'
import { MultiStepFormProvider } from '@/contexts/multi-step-form/provider'
import { steps } from './steps'
import { DocumentMultiStepForm } from './components/document-multi-step-form'

export const NewDocument = () => {
  const navigate = useNavigate()

  return (
    <MultiStepFormProvider steps={steps} initialData={{}}>
      <div className="space-y-8 py-6">
        <Button
          type="button"
          variant="link"
          className="text-blue-source"
          onClick={() => navigate(-1)}
        >
          <CornerUpLeft /> Voltar
        </Button>

        <div>
          <h1 className="font-lato font-bold text-3xl text-blue-1000">
            Adicionar documento
          </h1>
          <p className="font-lato font-normal text-base text-gray-800 mt-4">
            Configure os campos, envie seus documentos e extraia dados com
            precisão.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl space-y-6">
          <NewDocumentStepper />
          <DocumentMultiStepForm />
        </div>
      </div>
    </MultiStepFormProvider>
  )
}
