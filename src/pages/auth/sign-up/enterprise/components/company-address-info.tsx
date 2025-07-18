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
import { useEnterpriseSignUpMultiStepForm } from '../use-enterprise-sign-up-multi-step-form'
import { format, useMask } from '@react-input/mask'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { states } from '@/data/states'

const companyAddressInfoSchema = enterpriseSignUpSchema.pick({
  address: true,
})

type CompanyAddressInfoSchema = z.infer<typeof companyAddressInfoSchema>

const cepInputOptions = {
  mask: '#####-###',
  replacement: { '#': /\d/ },
}

export const CompanyAddressInfo = () => {
  const { data, nextStep, previousStep, setData } =
    useEnterpriseSignUpMultiStepForm()
  const cepInputRef = useMask(cepInputOptions)

  const form = useForm<CompanyAddressInfoSchema>({
    resolver: zodResolver(companyAddressInfoSchema),
    defaultValues: {
      address: {
        zipCode: format(data?.address?.zipCode || '', cepInputOptions),
        uf: data?.address?.uf || '',
        city: data?.address?.city || '',
        street: data?.address?.street || '',
        number: data?.address?.number || '',
        neighborhood: data?.address?.neighborhood || '',
        complement: data?.address?.complement || '',
      },
    },
  })

  async function handleChangeZipCode(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { value } = event.target
    const formattedValue = format(value, cepInputOptions)
    const zipCode = formattedValue.replace(/[^\d]+/g, '')

    if (zipCode.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${zipCode}/json/`,
        )
        const data = await response.json()

        if (!data.erro) {
          form.setValue('address.uf', data.uf)
          form.clearErrors('address.uf')
          form.setValue('address.city', data.localidade)
          form.clearErrors('address.city')
          form.setValue('address.street', data.logradouro)
          form.clearErrors('address.street')
          form.setValue('address.neighborhood', data.bairro)
          form.clearErrors('address.neighborhood')
        } else {
          form.setError('address.zipCode', {
            type: 'manual',
            message: 'CEP inválido.',
          })
          console.error('CEP inválido')
        }
      } catch (error) {
        form.setError('address.zipCode', {
          type: 'manual',
          message: 'Erro ao buscar CEP.',
        })
        console.error('Erro ao buscar CEP:', error)
      }
    }
  }

  function onSubmit(data: CompanyAddressInfoSchema) {
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
            className={cn('text-blue-source')}
            onClick={previousStep}
          >
            <CornerUpLeft /> Voltar
          </Button>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
              <FormField
                control={form.control}
                name="address.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato text-gray-300">
                      Cep
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        ref={cepInputRef}
                        onChange={(e) => {
                          handleChangeZipCode(e)
                          field.onChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.uf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato text-gray-300">
                      UF
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state, i) => (
                          <SelectItem key={i} value={state.acronym}>
                            {state.acronym}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Cidade
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
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">Rua</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Número
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
              name="address.neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Bairro
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
              name="address.complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Complemento <em>(opcional)</em>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
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
