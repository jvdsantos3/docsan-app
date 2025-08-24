import { api } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import type { CreateProfessionalRequest } from '@/types/http/create-professional-request'
import type { AxiosError } from 'axios'

export const useCreateProfessional = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: CreateProfessionalRequest) => {
      await api.post('/professionals', data)
    },
    onSuccess: () => {
      toast.success('Cadastro realizado com sucesso!')
      navigate('/sign-in')
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as
        | { message?: string }
        | undefined
      const errorMessage =
        errorData?.message || 'Erro ao realizar cadastro. Tente novamente.'
      toast.error(errorMessage)
    },
  })
}
