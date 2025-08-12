import type { PaginationResponse } from './pagination-response'
import type { Professional } from '../professional'
import type { User } from '../user'

export type GetProfessionalsResponse = {
  professionals: PaginationResponse<
    Professional & {
      user: User
    }
  >
}
