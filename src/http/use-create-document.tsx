import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateDocumentRequest } from './types/create-document-request'
import type { Company } from '@/types/company'

export const useCreateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      companyId,
      data,
    }: {
      companyId: Company['id']
      data: CreateDocumentRequest
    }) => {
      const formData = new FormData()
      formData.append('documentTypeId', data.documentTypeId)
      formData.append('file', data.file)
      formData.append('fields', JSON.stringify(data.fields))

      await api.post(`/documents/${companyId}`, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-documents'] })
      queryClient.invalidateQueries({ queryKey: ['get-documents-summary'] })
    },
  })
}
