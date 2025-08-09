import type { PaginationResponse } from './pagination-response'
import type { BranchActivity } from '../branch-activity'

export type GetBranchesActivityResponse = {
  branchesActivity: PaginationResponse<
    BranchActivity 
  >
}
