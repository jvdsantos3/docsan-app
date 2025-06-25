import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { services } from '@/data/mockups/services'
// import { useServices } from '@/hooks/use-services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const serviceCreateFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
})

// Define the form data type
export type ServiceCreateFormSchema = z.infer<typeof serviceCreateFormSchema>

type ServiceFormProps = {
  onCancel?: () => void
  onSucess?: () => void
}

export const ServiceForm = ({ onCancel, onSucess }: ServiceFormProps) => {
  // const { create } = useServices()

  const form = useForm<ServiceCreateFormSchema>({
    resolver: zodResolver(serviceCreateFormSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
    },
  })

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  const onSubmit = async (data: ServiceCreateFormSchema) => {
    // await create(data)
    services.push({
      ...data,
      content: <div>{data.content}</div>,
      id: String(services.length + 1),
      imageUrl: '',
      professional: {
        id: '1',
        name: 'John Doe',
        avatar: '',
        bio: 'Professional bio goes here',
        description: 'Professional description goes here',
        role: 'professional',
      },
    })

    if (onSucess) {
      onSucess()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <Input
                  placeholder="Dê um título para o seu serviço"
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <Input
                  placeholder="Diga o que o seu serviço soluciona"
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conteúdo</FormLabel>
                <Textarea
                  placeholder="Descreva em detalhes seu serviço"
                  {...field}
                />
              </FormItem>
            )}
          />

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              className="font-bold text-blue-source"
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </Button>

            <Button type="submit" className="font-bold">
              Adicionar serviço
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
