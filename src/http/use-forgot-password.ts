import { api } from '@/lib/axios'
import type { ForgotPasswordRequest } from '@/types/http/forgot-password-request'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function useForgotPassword() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      await api.post(`/password/request-reset`, data)
    },
    onSuccess: () => {
      toast.success(
        'Email para alterar a senha enviado, verifique sua caixa de entrada.',
      )
      navigate('/sign-in')
    },
  })
}
