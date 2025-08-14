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
  professionalChangeBanFormSchema,
  type ProfessionalChangeBanFormSchema,
} from './schema'
import type { Professional } from '@/types/professional'
import { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'

type ProfessionalChangeBanFormProps = {
  professional?: Professional
  onCancel?: () => void
  onSubmit: (data: ProfessionalChangeBanFormSchema) => Promise<void>
  professionalIsBanned: boolean
}

export const ProfessionalChangeBanForm = ({
  professional,
  onCancel,
  onSubmit,
  professionalIsBanned,
}: ProfessionalChangeBanFormProps) => {
  const form = useForm<ProfessionalChangeBanFormSchema>({
    resolver: zodResolver(professionalChangeBanFormSchema),
    defaultValues: {
      reason: '',
    },
  })

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  const handleSubmit = async (data: ProfessionalChangeBanFormSchema) => {
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
                  <FormLabel>{`Digite o motivo do ${professionalIsBanned ? 'desbanimento' : 'banimento'} do profissional`}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Dê um motivo para o ${professionalIsBanned ? 'desbanimento' : 'banimento'} do profissional`}
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
          <Button
            type="submit"
            className={
              professionalIsBanned
                ? 'bg-green-700 hover:bg-green-800'
                : 'bg-red-600 hover:bg-red-700'
            }
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
            {professionalIsBanned ? 'Desbanir' : 'Banir'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
