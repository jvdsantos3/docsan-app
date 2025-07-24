import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateDocumentRequest } from './types/create-document-request'
import { api } from '@/lib/axios'

export const useCreateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateDocumentRequest) => {
      const formData = new FormData()
      formData.append('documentTypeId', data.documentTypeId)
      formData.append('file', data.file)
      formData.append('fields', JSON.stringify(data.fields))

      await api.post('/documents', formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-documents'] })
    },
  })
}
