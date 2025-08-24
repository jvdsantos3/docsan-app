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
import { useCharacterLimit } from '@/hooks/use-character-limit'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  MAX_FILE_SIZE,
  MAX_LENGTH,
  serviceSchema,
  type ServiceSchema,
} from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Service } from '@/types/service'
import { useEffect } from 'react'
import { BannerUpload } from './banner-upload'

type ServiceFormProps = {
  service?: Service
}

const defaultValues = {
  name: '',
  summary: '',
  description: '',
}

export const ServiceForm = ({ service }: ServiceFormProps) => {
  const form = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues,
  })
  const {
    // value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength: MAX_LENGTH })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = form

  const onSubmit = async (data: ServiceSchema) => {
    console.log(data)
  }

  useEffect(() => {
    if (service) {
      setValue('name', service.name)
      setValue('summary', service.summary)
      setValue('description', service.description)
    }
  }, [service, setValue])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 py-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Dê um nome para o novo serviço da plataforma"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resumo</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Resuma o que o serviço soluciona"
                    maxLength={MAX_LENGTH}
                    onChange={(e) => {
                      handleChange(e)
                      field.onChange(e)
                    }}
                  />
                </FormControl>
                <div className="h-5 flex justify-between items-end">
                  <FormMessage />
                  <p
                    className="text-muted-foreground ml-auto text-right text-xs"
                    role="status"
                  >
                    <span className="tabular-nums">
                      {limit - characterCount}
                    </span>{' '}
                    caracteres restantes
                  </p>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="file"
            render={() => (
              <FormItem>
                <FormLabel>Imagem (Banner de apresentação)</FormLabel>
                <FormControl>
                  <BannerUpload
                    maxSize={MAX_FILE_SIZE}
                    onChange={(file) => {
                      setValue('file', file)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Descreva o que o serviço faz"
                    onChange={(e) => {
                      handleChange(e)
                      field.onChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
