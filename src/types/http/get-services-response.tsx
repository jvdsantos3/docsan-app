import type { Service } from '../service'
import type { PaginationResponse } from './pagination-response'

export type GetServicesResponse = {
  services: PaginationResponse<
    Service & {
      imageBase64?: string
    }
  >
}
