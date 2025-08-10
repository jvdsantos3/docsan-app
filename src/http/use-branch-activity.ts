import { api } from '@/lib/axios'
import type { GetBranchActivityResponse } from '@/types/http/get-branch-activity-response'
import type { BranchActivity } from '@/types/branch-activity'
import { useQuery } from '@tanstack/react-query'

export function useBranchActivity(
  branchActivitId: BranchActivity['id'],
) {
  return useQuery({
    queryKey: ['get-branch-activity', branchActivitId],
    queryFn: async () => {
      const response = await api.get<GetBranchActivityResponse>(
        `/branches-activity/${branchActivitId}`,
      )
      return response.data
    },
    enabled: !!branchActivitId,
  })
}
