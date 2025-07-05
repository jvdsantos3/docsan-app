import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ExportDialogProps = {
  documentId: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const schema = z.object({
  type: z.enum(['xlsx', 'csv', 'pdf'], {
    required_error: 'Selecione um formato de exportação.',
  }),
})

type ExportFormValues = z.infer<typeof schema>

export const ExportDialog = ({
  documentId,
  onOpenChange,
}: ExportDialogProps) => {
  const form = useForm<ExportFormValues>({ resolver: zodResolver(schema) })

  const onSubmit = (data: ExportFormValues) => {
    console.log(data)
  }

  return (
    <Dialog open={!!documentId} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white lg:min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Exportar documento</DialogTitle>
          <DialogDescription>
            Selecione o formato que deseja exportar este documento.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border border-blue-100 bg-background rounded-xl px-4 py-3">
            <p className="font-lato font-medium text-lg text-blue-1000">
              alvaráfuncionamento.pdf
            </p>
            <p className="font-lato font-normal text-sm text-gray-600">
              Recebido em 15/05/2025
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        <FormItem>
                          <FormLabel className="has-data-[state=checked]:border-primary/50 flex items-center gap-3 border border-input rounded-xl p-3">
                            <FormControl>
                              <RadioGroupItem value="xlsx" />
                            </FormControl>
                            <div>
                              <p className="font-lato font-medium text-lg text-blue-1000">
                                XLSX (Excel)
                              </p>
                              <p className="font-lato font-normal text-sm text-gray-600">
                                Planilha do Microsoft Excel
                              </p>
                            </div>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="has-data-[state=checked]:border-primary/50 flex items-center gap-3 border border-input rounded-xl p-3">
                            <FormControl>
                              <RadioGroupItem value="csv" />
                            </FormControl>
                            <div>
                              <p className="font-lato font-medium text-lg text-blue-1000">
                                CSV
                              </p>
                              <p className="font-lato font-normal text-sm text-gray-600">
                                Valores separados por vírgula
                              </p>
                            </div>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="has-data-[state=checked]:border-primary/50 flex items-center gap-3 border border-input rounded-xl p-3">
                            <FormControl>
                              <RadioGroupItem value="pdf" />
                            </FormControl>
                            <div>
                              <p className="font-lato font-medium text-lg text-blue-1000">
                                PDF
                              </p>
                              <p className="font-lato font-normal text-sm text-gray-600">
                                Documento portátil
                              </p>
                            </div>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
                <Button type="submit">Gerar e baixar</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
