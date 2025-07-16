import type { DocumentType } from '@/types/document-type'
import type { PaginationResponse } from './pagination-response'

export type GetDocumentTypesResponse = PaginationResponse<
  Array<
    DocumentType & {
      _count: {
        documents: number
      }
      metadata: {
        name: string
        type: string
        required: boolean
      }[]
    }
  >
>
