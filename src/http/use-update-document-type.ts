import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateDocumentTypeRequest } from './types/update-document-type-request'
import type { DocumentType } from '@/types/document-type'

export function useUpdateDocumentType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: DocumentType['id']
      data: UpdateDocumentTypeRequest
    }) => {
      await api.put(`/document-types/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-document-type'] })
      queryClient.invalidateQueries({ queryKey: ['get-document-types'] })
    },
  })
}
