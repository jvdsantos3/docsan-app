import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { BranchActivity } from '@/types/branch-activity'
import type { UpdateBranchActivityRequest } from '@/types/http/update-branch-activity-request'

export function useUpdateBranchActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: BranchActivity['id']
      data: UpdateBranchActivityRequest
    }) => {
      await api.put(`/branches-activity/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-branches-activity'] })
    },
  })
}
