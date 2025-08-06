// import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { BranchActivity } from '@/types/branch-activity'
import type { Company } from '@/types/company'
import type { UpdateBranchActivityRequest } from '@/types/http/update-branch-activity-request'

export function useUpdateBranchActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      companyId,
      data,
    }: {
      id: BranchActivity['id']
      companyId: Company['id']
      data: UpdateBranchActivityRequest
    }) => {
      console.log(id, companyId, data)
      return true
      // await api.put(`/company/${companyId}/document-types/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-branches-activity'] })
    },
  })
}
