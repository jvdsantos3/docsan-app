import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateDocumentTypeRequest } from '@/types/http/create-document-type-request'
import type { Company } from '@/types/company'

export function useCreateDocumentType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      companyId,
      data,
    }: {
      companyId: Company['id']
      data: CreateDocumentTypeRequest
    }) => {
      await api.post(`/company/${companyId}/document-types`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-document-types'] })
    },
  })
}
