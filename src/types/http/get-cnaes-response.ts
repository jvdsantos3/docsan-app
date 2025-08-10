import type { PaginationResponse } from './pagination-response'
import type { Cnae } from '../cnae'

export type GetCnaesResponse = {
  cnaes: PaginationResponse<
    Cnae 
  >
}
