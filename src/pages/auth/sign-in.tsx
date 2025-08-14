import { useState } from 'react'
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
import { Link } from 'react-router-dom'
import { Google } from '@ridemountainpig/svgl-react'
import { PasswordInput } from '@/components/ui/password-input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/use-auth'
import { SignUpSelectorDialog } from '@/components/dialogs/sign-up-selector-dialog'

const signInFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export const SignIn = () => {
  const [open, setOpen] = useState(false)

  const { login } = useAuth()

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function signIn(data: SignInFormSchema) {
    await login(data)
  }

  return (
    <>
      <div className="md:w-[28.125rem] lg:w-[28.125rem] bg-white border border-blue-source rounded-2xl m-2 md:m-0 py-5 px-4 md:py-10 md:px-8 flex flex-col items-center gap-10">
        <Link to={'/'}>
          <img className="w-[8.6875rem]" src="/logo-02.svg" alt="Docsan logo" />
        </Link>

        <div className="w-full space-y-8">
          <h1 className="text-lg font-medium text-gray-950">
            Faça login na sua conta!
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(signIn)} className="space-y-4">
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

              <FormField
                control={form.control}
                name="password"
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

              <div className="text-right">
                <Link to={'/forgot-password'} className="text-blue-source font-lato text-xs ">
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button type="submit" className="w-full rounded-xl">
                Entrar
              </Button>
            </form>
          </Form>

          <div className="space-y-4">
            <p className="font-lato text-sm text-gray-600">Ou acesse usando</p>
            <Button
              className="w-full text-gray-700 font-bold"
              variant="outline"
            >
              <Google />
              Google
            </Button>
          </div>
        </div>

        <p className="font-lato text-sm text-gray-600 text-center">
          Ainda não possui cadastro?{' '}
          <Link
            to={'#'}
            onClick={() => setOpen(true)}
            className="text-blue-source font-bold"
          >
            Cadastre-se agora!
          </Link>
        </p>
      </div>

      <SignUpSelectorDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
