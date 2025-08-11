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
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  registryTypeFormSchema,
  type RegistryTypeFormSchema,
} from './schema'
import type { RegistryType } from '@/types/registry-type'
import { useEffect } from 'react'

type RegistryTypeFormProps = {
  registryType?: RegistryType
  isEdit?: boolean
  onCancel?: () => void
  onSubmit: (data: RegistryTypeFormSchema) => Promise<void>
}

export const RegistryTypeForm = ({
  registryType,
  isEdit = false,
  onCancel,
  onSubmit,
}: RegistryTypeFormProps) => {
  const form = useForm<RegistryTypeFormSchema>({
    resolver: zodResolver(registryTypeFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  const handleSubmit = async (data: RegistryTypeFormSchema) => {
    await onSubmit(data)
  }

  useEffect(() => {
    if (registryType) {
      form.reset({
        name: registryType.name,
      })
    }
  }, [registryType, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-start">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do tipo de registro profissional</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dê um nome para um novo tipo de registro profissional"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
            {isEdit ? 'Salvar alterações' : 'Adicionar registro'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
