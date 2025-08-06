import { api } from '@/lib/axios'
import type { BranchActivity } from '@/types/branch-activity'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteBranchActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (branchActivitId: BranchActivity['id']) => {
      await api.delete(`/branches-activity/${branchActivitId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-branch-activity'] })
      queryClient.invalidateQueries({ queryKey: ['get-branches-activity'] })
    },
  })
}
