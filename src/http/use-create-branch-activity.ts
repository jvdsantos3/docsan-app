// import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateBranchActivityRequest } from '@/types/http/create-branch-activity-request'
import type { Company } from '@/types/company'

export function useCreateBranchActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      companyId,
      data,
    }: {
      companyId: Company['id']
      data: CreateBranchActivityRequest
    }) => {
      console.log(companyId, data)
      return true
      // await api.post(`/company/${companyId}/document-types`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-branches-activity'] })
    },
  })
}
