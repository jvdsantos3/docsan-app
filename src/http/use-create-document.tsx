import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  schema,
  type CreateDocumentRequest,
} from './types/create-document-request'
import { api } from '@/lib/axios'

export const useCreateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateDocumentRequest) => {
      const parsedData = schema.parse(data)

      const formData = new FormData()
      formData.append('documentTypeId', parsedData.documentTypeId)
      formData.append('file', parsedData.file)
      formData.append('fields', JSON.stringify(parsedData.fields))

      await api.post('/documents', formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-documents'] })
    },
  })
}
