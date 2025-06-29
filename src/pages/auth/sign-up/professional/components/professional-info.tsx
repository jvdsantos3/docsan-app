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

const professionalInfoSchema = professionalSignUpFormSchema.pick({
  fieldExpertise: true,
  professionalRegistry: true,
  registryUf: true,
  cnae: true,
})

type ProfessionalInfoSchema = z.infer<typeof professionalInfoSchema>

export const ProfessionalInfo = () => {
  const { data, setData, nextStep, previousStep } =
    useProfessionalSignUpMultiStepForm()
  const form = useForm<ProfessionalInfoSchema>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      fieldExpertise: data?.fieldExpertise || '',
      professionalRegistry: data?.professionalRegistry || '',
      registryUf: data?.registryUf || '',
      cnae: data?.cnae || '',
    },
  })

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
            <FormField
              control={form.control}
              name="fieldExpertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Ramo de atuação
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
                  <FormLabel className="font-lato text-gray-300">
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
            <FormField
              control={form.control}
              name="cnae"
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
