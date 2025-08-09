import type { PaginationResponse } from './pagination-response'
import type { RegistryType } from '../registry-type'

export type GetRegistryTypesResponse = {
  registryTypes: PaginationResponse<
    RegistryType
  >
}
