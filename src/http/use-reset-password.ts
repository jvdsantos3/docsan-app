import type { ResetPasswordFormSchema } from '@/components/forms/reset-password-form/schema'
import { api } from '@/lib/axios'
import type { ResetPasswordRequest } from '@/types/http/reset-password-request'
import { useMutation } from '@tanstack/react-query'
import type { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function useResetPassword(form: UseFormReturn<ResetPasswordFormSchema>) {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data: ResetPasswordRequest) => {
      const response = await api.post(`/password/reset`, data)
      return response.data
    },
    onSuccess: () => {
      toast.success('Senha alterada com sucesso.')
      navigate('/sign-in')
    },
    onError: (error: { response?: { data?: { errors?: { details?: { path: string[]; message: string }[] } } } }) => {
      if (error.response?.data?.errors?.details) {
        error.response.data.errors.details.forEach(
          (err: { path: string[]; message: string }) => {
            form.setError(err.path[0] as keyof ResetPasswordFormSchema, {
              type: 'server',
              message: err.message,
            })
          }
        )
      } else {
        toast.error('Link para atualização inválido ou expirado, tente realizar a solicitação novamente.')
      }
    },
  })
}

