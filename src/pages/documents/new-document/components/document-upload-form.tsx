import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useDocumentMultiStepForm } from '../use-document-multi-step-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const DocumentUploadForm = () => {
  const { nextStep, previousStep } = useDocumentMultiStepForm()
  const form = useForm()

  const onSubmit = () => {
    // Handle form submission logic here
    nextStep()
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Upload de documentos.
        </h2>
        <p className="font-lato font-normal text-base text-gray-800 mt-2">
          Envie arquivos PDF ou imagens (JPG/PNG) para extrair os dados
          configurados.
        </p>
      </div>

      <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg space-y-4">
        <p className="font-medium text-lg text-blue-1000">
          Campos configurados
        </p>
        <div className="flex gap-2">
          <Badge className="p-2 bg-white text-sm text-gray-800 border border-blue-100">
            Nome do cliente
          </Badge>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              className="text-gray-600 border-gray-gray-600"
              onClick={previousStep}
            >
              <ChevronLeft />
              Configurar campos
            </Button>
            <Button type="submit">
              Próximo <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
