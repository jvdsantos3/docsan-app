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
import { cn } from '@/lib/utils'
import { CornerUpLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { enterpriseSignUpSchema } from '../schema'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import { useEnterpriseSignUpMultiStepForm } from '../use-enterprise-sign-up-multi-step-form'
import { format, useMask } from '@react-input/mask'

const responsibleInfoSchema = enterpriseSignUpSchema.pick({
  responsible: true,
  terms: true,
})

type ResponsibleInfoSchema = z.infer<typeof responsibleInfoSchema>

const cpfInputOptions = {
  mask: '###.###.###-##',
  replacement: { '#': /\d/ },
}

export const ResponsibleInfo = () => {
  const {
    data: contextData,
    previousStep,
    setData,
  } = useEnterpriseSignUpMultiStepForm()
  const cpfInputRef = useMask(cpfInputOptions)
  const form = useForm<ResponsibleInfoSchema>({
    resolver: zodResolver(responsibleInfoSchema),
    defaultValues: {
      responsible: {
        fullName: contextData?.responsible?.fullName || '',
        cpf: format(contextData?.responsible?.cpf || '', cpfInputOptions),
      },
      terms: contextData?.terms || false,
    },
  })

  function onSubmit(data: ResponsibleInfoSchema) {
    setData(data)
    console.log('Form data:', contextData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <Button
            type="button"
            variant="ghost"
            className={cn('text-blue-source')}
            onClick={previousStep}
          >
            <CornerUpLeft /> Voltar
          </Button>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="responsible.fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Nome completo do responsável legal
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsible.cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    CPF do responsável legal
                  </FormLabel>
                  <FormControl>
                    <Input {...field} ref={cpfInputRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <FormLabel className="font-lato text-gray-300">
                      Li e concordo com os{' '}
                      <Link
                        to={'/terms'}
                        className="text-blue-source font-bold"
                      >
                        Termos de Uso
                      </Link>
                    </FormLabel>
                  </FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3 justify-between items-end">
            <p className="font-lato text-sm text-gray-600 text-center">
              Já possui uma conta?{' '}
              <Link to={'/sign-in'} className="text-blue-source font-bold">
                Faça login!
              </Link>
            </p>
            <Button
              type="submit"
              className="font-bold text-base rounded-xl"
              size="lg"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
