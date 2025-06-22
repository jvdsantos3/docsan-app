import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useForm } from 'react-hook-form'
import { enterpriseSignUpSchema } from '../schema'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CornerUpLeft } from 'lucide-react'
import { useEnterpriseSignUpMultiStepForm } from '../use-enterprise-sign-up-multi-step-form'
import { format, useMask } from '@react-input/mask'

const enterpriseInfoSchema = enterpriseSignUpSchema.pick({
  business: true,
})

type EnterpriseInfoSchema = z.infer<typeof enterpriseInfoSchema>

const cnpjInputOptions = {
  mask: '##.###.###/####-##',
  replacement: { '#': /\d/ },
}

const phoneInputOptions = {
  mask: '####-####',
  replacement: { '#': /\d/ },
}

export const BusinessInfo = () => {
  const { data, nextStep, setData } = useEnterpriseSignUpMultiStepForm()
  const phoneInputRef = useMask(phoneInputOptions)
  const cnpjInputRef = useMask(cnpjInputOptions)
  const form = useForm<EnterpriseInfoSchema>({
    resolver: zodResolver(enterpriseInfoSchema),
    defaultValues: {
      business: {
        companyName: data?.business?.companyName || '',
        tradeName: data?.business?.tradeName || '',
        cnpj: format(data?.business?.cnpj || '', cnpjInputOptions),
        email: data?.business?.email || '',
        password: data?.business?.password || '',
        cnae: data?.business?.cnae || '',
        phone: format(data?.business?.phone || '', phoneInputOptions),
      }
    }
  })

  function onSubmit(data: EnterpriseInfoSchema) {
    setData(data)
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <Button
            type="button"
            variant="ghost"
            className="text-blue-source invisible"
          >
            <CornerUpLeft /> Voltar
          </Button>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="business.companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Razão social
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
              name="business.tradeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Nome fantasia
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
              name="business.cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    CNPJ
                  </FormLabel>
                  <FormControl>
                    <Input {...field} ref={cnpjInputRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="business.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    E-mail comercial
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
              name="business.password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Senha
                  </FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="business.cnae"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    CNAE
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="business.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Telefone comercial
                  </FormLabel>
                  <FormControl>
                    <Input {...field} ref={phoneInputRef} />
                  </FormControl>
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
              Continuar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
