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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateDocumentNotification } from '@/http/use-create-document-notification'
import { useProfile } from '@/http/use-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

type NotifyDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const schema = z
  .object({
    option: z.enum(['1w', '1m', '3m', '6m', 'custom'], {
      required_error: 'Selecione um prazo de notificação.',
    }),
    customTime: z.coerce
      .number()
      .min(1, { message: 'Deve ser maior que zero' })
      .optional(),
    customPeriod: z.enum(['weeks', 'months']).optional(),
  })
  .refine(
    (data) => {
      if (data.option === 'custom') {
        return data.customTime && data.customPeriod
      }
      return true
    },
    {
      message: 'Preencha o prazo e o período para opção personalizada.',
      path: ['customTime'],
    },
  )
  .refine(
    (data) => {
      if (data.option === 'custom') {
        return data.customTime && data.customPeriod
      }
      return true
    },
    {
      message: 'Preencha o prazo e o período para opção personalizada.',
      path: ['customPeriod'],
    },
  )

type Schema = z.infer<typeof schema>

const defaultValues: Schema = {
  option: '1w',
  customTime: undefined,
  customPeriod: undefined,
}

export const NotifyDialog = ({ open, onOpenChange }: NotifyDialogProps) => {
  const { data: profile } = useProfile()
  const [searchParams] = useSearchParams()
  const documentId = searchParams.get('documentId') ?? ''
  const companyId = profile?.user.owner?.companyId ?? ''
  const { mutateAsync: createNotificationFn, error: createNotificationError } =
    useCreateDocumentNotification()
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const option = form.watch('option')

  const onSubmit = async (data: Schema) => {
    if (!documentId || !companyId) return

    let time = 1
    let period: 'week' | 'month' = 'week'

    switch (data.option) {
      case '1w':
        time = 1
        period = 'week'
        break
      case '1m':
        time = 1
        period = 'month'
        break
      case '3m':
        time = 3
        period = 'month'
        break
      case '6m':
        time = 6
        period = 'month'
        break
      case 'custom':
        time = data.customTime || 1
        period = data.customPeriod === 'weeks' ? 'week' : 'month'
        break
    }

    const payload = {
      time,
      period,
    }

    await createNotificationFn({
      documentId,
      companyId,
      data: payload,
    })

    toast.success('Notificação criada com sucesso!', {
      dismissible: true,
      duration: 5000,
      description: 'Você será notificado conforme configurado.',
      richColors: true,
    })

    onOpenChange(false)
  }

  if (createNotificationError) {
    toast.error('Erro ao criar notificação. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues)
    }
  }, [open, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white lg:min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Configurar notificação</DialogTitle>
          <DialogDescription>
            Escolha com quanto tempo de antecedência deseja ser avisado sobre o
            vencimento deste documento
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grow">
                <FormField
                  control={form.control}
                  name="option"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value)
                            if (value !== 'custom') {
                              form.setValue('customTime', undefined)
                              form.setValue('customPeriod', undefined)
                            }
                          }}
                          defaultValue={field.value}
                          className="flex flex-col"
                        >
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="1w" />
                            </FormControl>
                            <FormLabel className="font-lato font-normal text-base">
                              1 Semana antes
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="1m" />
                            </FormControl>
                            <FormLabel className="font-lato font-normal text-base">
                              1 Mês antes
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="3m" />
                            </FormControl>
                            <FormLabel className="font-lato font-normal text-base">
                              3 Meses antes
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="6m" />
                            </FormControl>
                            <FormLabel className="font-lato font-normal text-base">
                              6 Meses antes
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem
                                value="custom"
                                className="sr-only"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-base text-blue-700 !px-1">
                              <Plus size={16} />
                              Prazo personalizado
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {option === 'custom' && (
                  <div className="space-y-4 mt-4" data-state={''}>
                    <div className="border border-blue-100 bg-background rounded-md p-6">
                      <Label className="font-lato font-normal">
                        Quando você deseja ser notificado?
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-2">
                        <FormField
                          control={form.control}
                          name="customTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-lato">Prazo</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  className="bg-white"
                                  placeholder="Digite o número (ex: 2, 5, 10)"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="customPeriod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-lato">
                                Período
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Selecione o período" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="weeks">Semanas</SelectItem>
                                  <SelectItem value="months">Meses</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                      {form.formState.errors.customTime && (
                        <FormMessage>
                          {form.formState.errors.customTime.message}
                        </FormMessage>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin" />
                  )}
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
