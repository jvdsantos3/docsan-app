import { api } from '@/lib/axios'
import type { CreateServiceRequest } from '@/types/http/create-service-request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateService = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateServiceRequest) => {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('summary', data.summary)
      formData.append('description', data.description)
      if (data.file) {
        formData.append('file', data.file)
      }

      await api.post('/services', formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-services'] })
    },
  })
}
