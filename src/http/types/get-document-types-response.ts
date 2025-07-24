import type { DocumentType } from '@/types/document-type'
import type { PaginationResponse } from './pagination-response'

export type GetDocumentTypesResponse = PaginationResponse<
  DocumentType & {
    _count: {
      documents: number
    }
  }
>
