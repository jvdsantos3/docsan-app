import type { PaginationResponse } from './pagination-response'
import type { Professional } from '../professional'

export type GetProfessionalsResponse = {
  professionals: PaginationResponse<Professional>
}
