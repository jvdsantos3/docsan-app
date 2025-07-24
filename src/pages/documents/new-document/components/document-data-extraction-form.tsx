import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronLeft, ChevronRight, Download, Eye, Loader2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDocumentMultiStepForm } from '../use-document-multi-step-form'
import { newDocumentFormSchema } from '../schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateDocument } from '@/http/use-create-document'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

const dataExtractionFormSchema = newDocumentFormSchema.pick({
  fields: true,
})

type DataExtractionFormSchema = z.infer<typeof dataExtractionFormSchema>

export const DocumentDataExtractionForm = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { mutateAsync: createDocument, isError } = useCreateDocument()
  const { data: contextData, previousStep } = useDocumentMultiStepForm()
  const form = useForm<DataExtractionFormSchema>({
    resolver: zodResolver(dataExtractionFormSchema),
    defaultValues: {
      fields: contextData.fields.map((field) => ({
        name: field.name,
        value: field.value ?? undefined,
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'fields',
  })

  async function onSubmit(data: DataExtractionFormSchema) {
    const companyId = user?.profile?.companyId

    if (!companyId) {
      return
    }

    await createDocument({
      companyId,
      data: {
        file: contextData.file!,
        ...contextData,
        ...data,
      },
    })

    navigate('/documents')
    toast.success('Documento criado com sucesso!', {
      dismissible: true,
      duration: 5000,
      richColors: true,
    })
  }

  if (isError) {
    toast.error('Erro ao criar documento. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    {fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`fields.${index}.value`}
                        render={({ field: formField }) => (
                          <TableRow>
                            <TableCell className="md:px-8">
                              <FormLabel>{field.name}</FormLabel>
                            </TableCell>
                            <TableCell className="md:px-8">
                              <FormControl>
                                <Input
                                  className="w-full border-0 focus:border focus:border-input px-0 focus:px-3 transition-all shadow-none focus:shadow-sm"
                                  {...formField}
                                />
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        )}
                      />
                    ))}
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
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin" />
                )}
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
