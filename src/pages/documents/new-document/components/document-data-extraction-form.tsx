import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronLeft, ChevronRight, Download, Eye } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useDocumentMultiStepForm } from '../use-document-multi-step-form'

export const DocumentDataExtractionForm = () => {
  const { previousStep } = useDocumentMultiStepForm()
  const form = useForm()

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2">
        <div>
          <h2 className="font-lato font-bold text-[21px] text-blue-1000">
            Dados extraídos.
          </h2>
          <p className="font-lato font-normal text-base text-gray-800 mt-2">
            Confira e edite os dados extraídos dos seus documentos. Clique em
            qualquer célula para editar.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline-primary"
            className="font-bold text-blue-1000"
          >
            <Download /> Exportar
          </Button>
          <Button
            variant="outline-primary"
            className="font-bold text-blue-1000"
          >
            <Eye />
            Visualizar documento
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          <div className="space-y-4">
            <div>
              <div className="overflow-hidden rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-60 md:px-8">Campo</TableHead>
                      <TableHead className="md:px-8">Valor extraído</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="md:px-8">Nome do cliente</TableCell>
                      <TableCell className="md:px-8">
                        <Input
                          type="text"
                          className="w-full border-0 focus:border focus:border-input px-0 focus:px-3 transition-all"
                          defaultValue="José Francisco Silva"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" onClick={previousStep}>
                <ChevronLeft />
                Upload de documento
              </Button>
              <Button type="submit">
                Finalizar processo
                <ChevronRight />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
