import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteDocumentType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (documentTypeId: string) => {
      await api.delete(`/document-types/${documentTypeId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-document-types'] })
    },
  })
}
