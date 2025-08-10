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
import { CornerUpLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { professionalSignUpFormSchema } from '../schema'
import { z } from 'zod'
import { useProfessionalSignUpMultiStepForm } from '../use-professional-sign-up-multi-step-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { states } from '@/data/states'
import { useMemo, useState } from 'react'
import { useBranchesActivity } from '@/http/use-branches-activity'
import { ComboBox } from '@/components/ui/combobox'
import { useCnaes } from '@/http/use-cnaes'
import { useRegistryTypes } from '@/http/use-registry-types'
import { format, useMask } from '@react-input/mask'
import { isValidCNPJ } from '@/lib/utils'

const professionalInfoSchema = professionalSignUpFormSchema
  .pick({
    classification: true,
    cnpj: true,
    cnae: true,
    branchActivity: true,
    professionalRegistry: true,
    registryUf: true,
    registryType: true,
  })
  .superRefine((data, ctx) => {
    if (data.classification === 'cnpj') {
      if (!data.cnae) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CNAE é obrigatório.',
          path: ['cnae'],
        })
      }

      if (!data.cnpj) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CNPJ é obrigatório.',
          path: ['cnpj'],
        })
      }

      if (!data.cnpj || !isValidCNPJ(data.cnpj)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CNPJ inválido.',
          path: ['cnpj'],
        })
      }
    }
  })

type ProfessionalInfoSchema = z.infer<typeof professionalInfoSchema>

const cnpjInputOptions = {
  mask: '##.###.###/####-##',
  replacement: { '#': /\d/ },
}

export const ProfessionalInfo = () => {
  const cnpjInputRef = useMask(cnpjInputOptions)
  const { data, setData, nextStep, previousStep } =
    useProfessionalSignUpMultiStepForm()
  const form = useForm<ProfessionalInfoSchema>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      classification: data?.classification || 'cpf',
      cnpj: format(data?.cnpj || '', cnpjInputOptions),
      branchActivity: data?.branchActivity || '',
      registryType: data?.registryType || '',
      professionalRegistry: data?.professionalRegistry || '',
      registryUf: data?.registryUf || '',
      cnae: data?.cnae || '',
    },
  })
  const [filterCnae, setFilterCnae] = useState('')
  const [filterBranchActivity, setFilterBranchActivity] = useState('')
  const [filterRegistryType, setFilterRegistryType] = useState('')

  const classification = form.watch('classification')

  const { data: responseBranchActivity, isLoading: isLoadingBranchesActivity } =
    useBranchesActivity({
      active: true,
      filter: filterBranchActivity,
    })

  const selectedBranchActivity = useMemo(() => {
    const item = responseBranchActivity?.branchesActivity.data.find(
      (branchActivity) => branchActivity.id === data.branchActivity,
    )
    return item ? { label: item.name, value: item.id } : undefined
  }, [data.branchActivity, responseBranchActivity])

  const { data: responseCnae, isLoading: isLoadingCnaes } = useCnaes({
    active: true,
    filter: filterCnae,
  })

  const selectedCnae = useMemo(() => {
    const item = responseCnae?.cnaes.data.find((cnae) => cnae.id === data.cnae)
    return item ? { label: item.code, value: item.id } : undefined
  }, [data.cnae, responseCnae])

  const { data: responseRegistryType, isLoading: isLoadingRegistryTypes } =
    useRegistryTypes({
      active: true,
      filter: filterRegistryType,
    })

  const selectedRegistryType = useMemo(() => {
    const item = responseRegistryType?.registryTypes.data.find(
      (registryType) => registryType.id === data.registryType,
    )
    return item ? { label: item.name, value: item.id } : undefined
  }, [data.registryType, responseRegistryType])

  function onSubmit(data: ProfessionalInfoSchema) {
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
            className="text-blue-source"
            onClick={previousStep}
          >
            <CornerUpLeft /> Voltar
          </Button>

          <div className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="classification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classificação</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma classificação" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cpf">Pessoa física</SelectItem>
                        <SelectItem value="cnpj">Pessoa jurídica</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div
                role="region"
                className="grid transition-all ease-in-out data-[state=collapsed]:grid-rows-[0fr] data-[state=collapsed]:opacity-0 data-[state=expanded]:grid-rows-[1fr] data-[state=expanded]:opacity-100 data-[state=expanded]:mt-6"
                data-state={
                  classification === 'cnpj' ? 'expanded' : 'collapsed'
                }
              >
                <div className="space-y-6 overflow-y-hidden">
                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">CNPJ</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            ref={cnpjInputRef}
                            disabled={classification !== 'cnpj'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cnae"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">CNAE</FormLabel>
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
                            placeholder="Todos os ramos de atuação"
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
              </div>
            </div>
            <FormField
              control={form.control}
              name="branchActivity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Ramo de atuação
                  </FormLabel>
                  <FormControl>
                    <ComboBox
                      items={
                        responseBranchActivity?.branchesActivity.data.map(
                          (item) => ({
                            value: item.id,
                            label: item.name,
                          }),
                        ) || []
                      }
                      onChange={field.onChange}
                      onSearch={(value) => setFilterBranchActivity(value)}
                      value={field.value}
                      selectedItem={selectedBranchActivity}
                      isLoading={isLoadingBranchesActivity}
                      className="w-full"
                      contentClassName="w-[var(--radix-popover-trigger-width)]"
                      placeholder="Todos os ramos de atuação"
                      emptyMessage="Nenhum ramo de atuação encontrado."
                      delay={300}
                      shouldFilter={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Tipo de registro profissional
                  </FormLabel>
                  <FormControl>
                    <ComboBox
                      items={
                        responseRegistryType?.registryTypes.data.map(
                          (item) => ({
                            value: item.id,
                            label: item.name,
                          }),
                        ) || []
                      }
                      onChange={field.onChange}
                      onSearch={(value) => setFilterRegistryType(value)}
                      value={field.value}
                      selectedItem={selectedRegistryType}
                      isLoading={isLoadingRegistryTypes}
                      className="w-full"
                      contentClassName="w-[var(--radix-popover-trigger-width)]"
                      placeholder="Todos os tipos de registro"
                      emptyMessage="Nenhum tipo de registro encontrado."
                      delay={300}
                      shouldFilter={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="professionalRegistry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Registro profissional
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
              name="registryUf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    UF do registro
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
