import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordFormSchema, type ResetPasswordFormSchema } from './schema'
import { useForm } from 'react-hook-form'
import { useResetPassword } from '@/http/use-reset-password'
import { PasswordInput } from '@/components/ui/password-input'

type ResetPasswordFormProps = {
  token: string
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: '',
      password_confirm: '',
      token,
    },
  })

  const { mutateAsync: resetPassword } = useResetPassword(form)
  
    async function handleResetPassword(data: ResetPasswordFormSchema) {
        await resetPassword(data)
    }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleResetPassword)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="newPassword"
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
  )
}
