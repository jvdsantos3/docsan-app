import { api } from '@/lib/axios'
import type { DocumentType } from '@/types/document-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useToggleDocumentTypeStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      companyId,
      documentTypeId,
    }: {
      companyId: DocumentType['companyId']
      documentTypeId: DocumentType['id']
    }) => {
      await api.patch(
        `/company/${companyId}/document-types/${documentTypeId}/active`,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-document-types'] })
    },
  })
}
