// import { api } from '@/lib/axios'
import type { Company } from '@/types/company'
// import type { GetBranchActivityResponse } from '@/types/http/get-branch-activity-response'
import type { BranchActivity } from '@/types/branch-activity'
// import { useQuery } from '@tanstack/react-query'

export function useBranchActivity(
  branchActivitId: BranchActivity['id'],
  companyId: Company['id'],
) {
  console.log(branchActivitId, companyId);

  return {
    data: {
      id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc89",
      name: "Saúde",
      createdAt: "2025-07-30T14:09:16.482Z",
      updatedAt: "2025-07-30T14:09:16.482Z"
    },
    isLoading: false
  }
  // return useQuery({
  //   queryKey: ['get-branch-activity', branchActivitId],
  //   queryFn: async () => {
  //     const response = await api.get<GetBranchActivityResponse>(
  //       `/company/${companyId}/document-types/${branchActivitId}`,
  //     )
  //     return response.data
  //   },
  //   enabled: !!branchActivitId && !!companyId,
  // })
}
