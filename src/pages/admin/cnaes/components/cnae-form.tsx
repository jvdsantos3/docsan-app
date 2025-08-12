import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { Cnae } from '@/types/cnae'
import { useEffect } from 'react'

type CnaeFormProps = {
  cnae?: Cnae
  isEdit?: boolean
  onSubmit: (data: CnaeFormSchema) => Promise<void>
  onCancel?: () => void
}

const schema = z.object({
  code: z
    .string()
    .min(1, 'Informe o código')
    .max(10, 'O código deve ter no máximo 10 caracteres.')
    .transform((code) => code.replace(/[^\d]/g, '')),
  description: z.string().min(1, 'Adicione uma descrição.').max(100),
})

type CnaeFormSchema = z.infer<typeof schema>

export const CnaeForm = ({
  cnae,
  isEdit,
  onCancel,
  onSubmit,
}: CnaeFormProps) => {
  const form = useForm<CnaeFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
      description: '',
    },
  })

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  const handleSubmit = async (data: CnaeFormSchema) => {
    await onSubmit(data)
  }

  useEffect(() => {
    if (cnae) {
      form.setValue('code', cnae.code)
      form.setValue('description', cnae.description)
    }
  }, [cnae, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNAE</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value.replace(/[^\d]/g, ''))
                    }}
                    placeholder="Digite o CNAE"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Dê uma descrição" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
            {isEdit ? 'Salvar alterações' : 'Adicionar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
