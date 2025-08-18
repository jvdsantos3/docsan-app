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
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CornerUpLeft, Send } from 'lucide-react'
import { useForgotPassword } from '@/http/use-forgot-password'
import { toast } from 'sonner'

const forgotPasswordFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>



export const ForgotPassword = () => {
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const { mutateAsync: forgotPassword, error: createError } =
    useForgotPassword()

  async function handleForgotPassword(data: ForgotPasswordFormSchema) {
    await forgotPassword(data)
  }

  if (createError) {
    toast.error('Erro ao enviar email de recuperação de senha. Tente novamente.', {
      dismissible: true,
      duration: 5000,
    })
  }

  const navigate = useNavigate()

  return (
    <>
      <div className="md:w-[28.125rem] lg:w-[28.125rem] bg-white border border-blue-source rounded-2xl m-2 md:m-0 py-5 px-4 md:py-10 md:px-8 flex flex-col items-center gap-10">
        <Button
          type="button"
          variant="link"
          className="text-blue-source mr-auto"
          onClick={() => navigate('/sign-in')}
        >
          <CornerUpLeft /> Voltar
        </Button>

        <Link to={'/'}>
          <img className="w-23 h-28" src="/padlock.svg" alt="Padlock" />
        </Link>

        <div className="w-full space-y-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-medium text-gray-950">
              Esqueceu sua senha?
            </h1>
            <p className="font-lato font-normal text-[#7D85A0]">
              Digite seu e-mail no campo abaixo e enviaremos um link para
              redefinição.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleForgotPassword)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
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
              <Button type="submit" className="w-full rounded-xl">
                Enviar link de recuperação <Send />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
