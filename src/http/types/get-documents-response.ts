import type { PaginationResponse } from './pagination-response'
import type { DocumentType } from '@/types/document-type'
import type { Document } from '@/types/document'

export type GetDocumentsResponse = {
  documents: PaginationResponse<
    Document & {
      documentType: DocumentType
      status: 'inDay' | 'near' | 'won'
    }
  >
}
