import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateBranchActivityRequest } from '@/types/http/create-branch-activity-request'

export function useCreateBranchActivity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: CreateBranchActivityRequest
    }) => {
      await api.post(`/branches-activity`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-branches-activity'] })
    },
  })
}
