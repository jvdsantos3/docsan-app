import type { Service } from '../service'
import type { PaginationResponse } from './pagination-response'

export type GetServicesResponse = {
  services: PaginationResponse<
    Service & {
      image?: {
        name: string
        type: string
        size: number
        base64: string
      }
    }
  >
}
