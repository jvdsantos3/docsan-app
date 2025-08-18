import { z } from 'zod'

export const resetPasswordFormSchema = z
  .object({
    newPassword: z.string().min(1, 'Senha obrigatória'),
    password_confirm: z.string().min(1, 'Senha obrigatória'),
    token: z.string(),
  })
  .refine((data) => data.newPassword === data.password_confirm, {
    message: 'As senhas não coincidem',
    path: ['password_confirm'],
  })

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>
