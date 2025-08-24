import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CornerUpLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { professionalSignUpFormSchema } from '../schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProfessionalSignUpMultiStepForm } from '../use-professional-sign-up-multi-step-form'
import { format, useMask } from '@react-input/mask'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { states } from '@/data/states'
import { useCreateProfessional } from '@/http/use-create-professional'
import { queryZipCode } from '@/lib/via-cep'
import { TermsDialog } from '@/components/dialogs/terms-dialog'
import { useState } from 'react'

const addressInfoSchema = professionalSignUpFormSchema.pick({
  zipCode: true,
  uf: true,
  city: true,
  street: true,
  number: true,
  neighborhood: true,
  complement: true,
  terms: true,
})

type AddressInfoSchema = z.infer<typeof addressInfoSchema>

const cepInputOptions = {
  mask: '#####-###',
  replacement: { '#': /\d/ },
}

export const AddressInfo = () => {
  const [open, setOpen] = useState(false)
  const { mutate: createProfessional, isPending } = useCreateProfessional()
  const {
    data: contextData,
    setData,
    previousStep,
  } = useProfessionalSignUpMultiStepForm()
  const cepInputRef = useMask(cepInputOptions)
  const form = useForm<AddressInfoSchema>({
    resolver: zodResolver(addressInfoSchema),
    defaultValues: {
      zipCode: format(contextData?.zipCode || '', cepInputOptions),
      uf: contextData?.uf || '',
      city: contextData?.city || '',
      street: contextData?.street || '',
      number: contextData?.number || '',
      neighborhood: contextData?.neighborhood || '',
      complement: contextData?.complement || '',
      terms: false,
    },
  })

  async function handleChangeZipCode(value: string) {
    form.clearErrors('zipCode')
    const formattedZipCode = value.replace(/[^\d]+/g, '')

    if (formattedZipCode.length !== 8) return

    const { success, data, error } = await queryZipCode(formattedZipCode)

    if (!success) {
      switch (error) {
        case 'InvalidZipCode':
          form.setError('zipCode', {
            type: 'manual',
            message: 'CEP inválido.',
          })
          break
        case 'FetchError':
          break
      }

      return
    }

    if (data) {
      form.setValue('uf', data.uf)
      form.clearErrors('uf')
      form.setValue('city', data.localidade)
      form.clearErrors('city')
      form.setValue('street', data.logradouro)
      form.clearErrors('street')
      form.setValue('neighborhood', data.bairro)
      form.clearErrors('neighborhood')
    }
  }

  function onSubmit(data: AddressInfoSchema) {
    setData(data)

    const payload = {
      ...contextData,
      ...data,
    }

    createProfessional(payload)
  }

  return (
    <>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-lato text-gray-300">
                        Cep
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            handleChangeZipCode(e.target.value)
                            field.onChange(e.target.value)
                          }}
                          ref={cepInputRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="uf"
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
                name="city"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-lato text-gray-300">
                        Rua
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
                  name="number"
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
              </div>
              <FormField
                control={form.control}
                name="neighborhood"
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
                name="complement"
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
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(!!checked)
                          }
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
                disabled={isPending}
              >
                {isPending ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <TermsDialog
        open={open}
        onOpenChange={setOpen}
        accepted={form.watch('terms')}
        onAcceptedChange={(val) => form.setValue('terms', val)}
      />
    </>
  )
}
