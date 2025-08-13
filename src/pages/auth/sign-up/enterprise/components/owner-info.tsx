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
import { Link, useNavigate } from 'react-router-dom'
import { enterpriseSignUpSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import { useEnterpriseSignUpMultiStepForm } from '../use-enterprise-sign-up-multi-step-form'
import { format, useMask } from '@react-input/mask'
import { PasswordInput } from '@/components/ui/password-input'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { useState } from 'react'
import { TermsDialog } from '@/components/dialogs/terms-dialog'

const ownerInfoSchema = enterpriseSignUpSchema.pick({
  owner: true,
  terms: true,
})

type OwnerInfoSchema = z.infer<typeof ownerInfoSchema>

const cpfInputOptions = {
  mask: '###.###.###-##',
  replacement: { '#': /\d/ },
}

const phoneInputOptions = {
  mask: '(##) #####-####',
  replacement: { '#': /\d/ },
}

export const ResponsibleInfo = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const {
    data: contextData,
    previousStep,
    setData,
  } = useEnterpriseSignUpMultiStepForm()
  const cpfInputRef = useMask(cpfInputOptions)
  const phoneInputRef = useMask(phoneInputOptions)
  const form = useForm<OwnerInfoSchema>({
    resolver: zodResolver(ownerInfoSchema),
    defaultValues: {
      owner: {
        name: contextData?.owner?.name || '',
        cpf: format(contextData?.owner?.cpf || '', cpfInputOptions),
        phone: format(contextData?.owner?.phone || '', phoneInputOptions),
        email: contextData?.owner?.email || '',
        password: contextData?.owner?.password || '',
      },
      terms: contextData?.terms || false,
    },
  })

  async function onSubmit(data: OwnerInfoSchema) {
    setData(data)

    const { company, address } = contextData

    const payload = {
      name: company.name,
      tradeName: company.tradeName,
      cnpj: company.cnpj,
      cnaeId: company.cnaeId,
      ownerName: data.owner.name,
      ownerCpf: data.owner.cpf,
      phone: data.owner.phone,
      ownerEmail: data.owner.email,
      password: data.owner.password,
      zipCode: address.zipCode,
      uf: address.uf,
      city: address.city,
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      complement: address.complement,
    }

    await api.post('/companies', payload)
    navigate('/sign-in')
  }

  return (
    <>
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
                name="owner.name"
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
                name="owner.cpf"
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
                name="owner.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato text-gray-300">
                      Telefone
                    </FormLabel>
                    <FormControl>
                      <Input {...field} ref={phoneInputRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="owner.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato text-gray-300">
                      E-mail
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
                name="owner.password"
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
                          to={'#'}
                          onClick={() => setOpen(true)}
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

      <TermsDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
