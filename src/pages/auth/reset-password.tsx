import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CornerUpLeft } from 'lucide-react'
import { PasswordInput } from '@/components/ui/password-input'

const resetPasswordFormSchema = z.object({
  password: z.string().min(1, 'Senha obrigatória'),
  password_confirm: z.string().min(1, 'Senha obrigatória'),
})

type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>

export const ResetPassword = () => {
  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      password_confirm: ''
    },
  })
  // const { token } = useParams<{ token: string }>()

  // async function handleResetPassword(data: ResetPasswordFormSchema) {
  //   await resetPassword(data, token)
  // }

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
              Redefinir sua senha
            </h1>
            <p className="font-lato font-normal text-[#7D85A0]">
              Escolha uma senha forte para proteger sua conta.
            </p>
          </div>

          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(handleResetPassword)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato text-gray-300">
                      Nova senha
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
                name="password_confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato text-gray-300">
                      Confirmar nova senha
                    </FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-xl">
                Redefinir senha
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
