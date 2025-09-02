import { api } from '@/lib/axios'
import type { UpdateServiceRequest } from '@/types/http/update-service-request'
import type { Service } from '@/types/service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateService = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: Service['id']
      data: UpdateServiceRequest
    }) => {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('summary', data.summary)
      formData.append('description', data.description)
      if (data.file) {
        formData.append('file', data.file)
      }

      await api.put(`/services/${id}`, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-service'] })
      queryClient.invalidateQueries({ queryKey: ['get-services'] })
    },
  })
}
