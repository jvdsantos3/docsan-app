import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateDocumentNotificationRequest } from '@/types/http/create-document-notification-request'
import { api } from '@/lib/axios'
import type { Document } from '@/types/document'
import type { Company } from '@/types/company'

export const useCreateDocumentNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      documentId,
      companyId,
      data,
    }: {
      documentId: Document['id']
      companyId: Company['id']
      data: CreateDocumentNotificationRequest
    }) => {
      await api.post(
        `/company/${companyId}/documents/${documentId}/notification`,
        data,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-document'] })
      queryClient.invalidateQueries({ queryKey: ['get-documents'] })
    },
  })
}
