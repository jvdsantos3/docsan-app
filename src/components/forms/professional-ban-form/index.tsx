import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  professionalBanFormSchema,
  type ProfessionalBanFormSchema,
} from './schema'
import type { Professional } from '@/types/professional'
import { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'

type ProfessionalBanFormProps = {
  professional?: Professional
  onCancel?: () => void
  onSubmit: (data: ProfessionalBanFormSchema) => Promise<void>
}

export const ProfessionalBanForm = ({
  professional,
  onCancel,
  onSubmit,
}: ProfessionalBanFormProps) => {
  const form = useForm<ProfessionalBanFormSchema>({
    resolver: zodResolver(professionalBanFormSchema),
    defaultValues: {
      reason: '',
    },
  })

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  const handleSubmit = async (data: ProfessionalBanFormSchema) => {
    await onSubmit(data)
  }

  useEffect(() => {
    if (professional) {
      form.reset({
        reason: professional.name,
      })
    }
  }, [professional, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-start">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Digite o motivo da reprovação do profissional</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Dê um motivo para a reprovação do profissional"
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
            Reprovar
          </Button>
        </div>
      </form>
    </Form>
  )
}
