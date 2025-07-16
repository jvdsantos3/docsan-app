import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateDocumentTypeRequest } from './types/create-document-type-request'

export function useCreateDocumentType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateDocumentTypeRequest) => {
      await api.post('/document-types', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-document-types'] })
    },
  })
}
