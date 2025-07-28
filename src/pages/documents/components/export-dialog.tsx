import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
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
import { useAuth } from '@/hooks/use-auth'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

type ExportDialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const schema = z.object({
  type: z.enum(['xlsx', 'csv', 'pdf'], {
    required_error: 'Selecione um formato de exportação.',
  }),
})

type ExportFormValues = z.infer<typeof schema>

const options = [
  {
    value: 'xlsx',
    label: 'XLSX (Excel)',
    description: 'Planilha do Microsoft Excel',
    disabled: true,
  },
  {
    value: 'csv',
    label: 'CSV',
    description: 'Valores separados por vírgula',
    disabled: true,
  },
  {
    value: 'pdf',
    label: 'PDF',
    description: 'Documento portátil',
    disabled: false,
  },
] as const

export const ExportDialog = ({ onOpenChange }: ExportDialogProps) => {
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const form = useForm<ExportFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'pdf' },
  })

  const documentId = searchParams.get('documentId')

  const downloadFile = async (type: 'xlsx' | 'csv' | 'pdf') => {
    const companyId = user?.profile?.companyId

    if (!companyId || !documentId) return

    try {
      const res = await api.get(
        `/company/${companyId}/documents/${documentId}/export`,
        {
          responseType: 'blob',
        },
      )

      const fileName = `documento-${documentId}.${type}`
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()

      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)

      toast.error('Falha ao baixar o documento. Por favor, tente novamente.')
    }
  }

  const onSubmit = async (data: ExportFormValues) => {
    await downloadFile(data.type)
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
                        {options.map((option) => (
                          <FormItem key={option.value}>
                            <FormLabel
                              className={cn(
                                'has-data-[state=checked]:border-primary/50 flex items-center gap-3 border border-input rounded-xl p-3',
                                option.disabled && 'opacity-50',
                              )}
                            >
                              <FormControl>
                                <RadioGroupItem value={option.value} disabled />
                              </FormControl>
                              <div>
                                <p className="font-medium text-lg text-blue-1000">
                                  {option.label}
                                </p>
                                <p className="font-normal text-sm text-gray-600">
                                  {option.description}
                                </p>
                              </div>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit">Gerar e baixar</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
