import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { enterpriseSignUpSchema } from '../schema'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CornerUpLeft } from 'lucide-react'
import { useEnterpriseSignUpMultiStepForm } from '../use-enterprise-sign-up-multi-step-form'
import { format, useMask } from '@react-input/mask'
import { useCnaes } from '@/http/use-cnaes'
import { useMemo, useState } from 'react'
import { ComboBox } from '@/components/ui/combobox'

const companyInfoSchema = enterpriseSignUpSchema.pick({
  company: true,
})

type CompanyInfoSchema = z.infer<typeof companyInfoSchema>

const cnpjInputOptions = {
  mask: '##.###.###/####-##',
  replacement: { '#': /\d/ },
}

export const CompanyInfo = () => {
  const { data, nextStep, setData } = useEnterpriseSignUpMultiStepForm()
  const cnpjInputRef = useMask(cnpjInputOptions)
  const form = useForm<CompanyInfoSchema>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      company: {
        name: data?.company?.name || '',
        tradeName: data?.company?.tradeName || '',
        cnpj: format(data?.company?.cnpj || '', cnpjInputOptions),
        cnaeId: data?.company?.cnaeId || '',
      },
    },
  })

  function onSubmit(data: CompanyInfoSchema) {
    setData(data)
    nextStep()
  }

  const [filterCnae, setFilterCnae] = useState('')

  const { data: responseCnae, isLoading: isLoadingCnaes } = useCnaes({
    active: true,
    filter: filterCnae,
  })

  const selectedCnae = useMemo(() => {
    const item = responseCnae?.cnaes.data.find(
      (cnae) => cnae.id === data.company?.cnaeId,
    )
    return item ? { label: item.code, value: item.id } : undefined
  }, [data.company?.cnaeId, responseCnae])

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
              name="company.name"
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
              name="company.tradeName"
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
              name="company.cnpj"
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
              name="company.cnaeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    CNAE
                  </FormLabel>
                  <FormControl>
                    <ComboBox
                      items={
                        responseCnae?.cnaes.data.map((item) => ({
                          value: item.id,
                          label: item.code,
                        })) || []
                      }
                      onChange={field.onChange}
                      onSearch={(value) => setFilterCnae(value)}
                      value={field.value}
                      selectedItem={selectedCnae}
                      isLoading={isLoadingCnaes}
                      className="w-full"
                      contentClassName="w-[var(--radix-popover-trigger-width)]"
                      placeholder="Todos os CNAEs"
                      emptyMessage="Nenhum CNAE encontrado."
                      delay={300}
                      shouldFilter={false}
                    />
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
