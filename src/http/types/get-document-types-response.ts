import type { DocumentType } from '@/types/document-type'
import type { PaginationResponse } from './pagination-response'

export type GetDocumentTypesResponse = {
  documentTypes: PaginationResponse<
    DocumentType & {
      _count: {
        documents: number
      }
    }
  >
}
