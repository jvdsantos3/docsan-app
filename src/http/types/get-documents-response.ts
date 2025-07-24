import type { Indexation } from '@/types/indexation'
import type { PaginationResponse } from './pagination-response'
import type { DocumentType } from '@/types/document-type'
import type { Document } from '@/types/document'

export type GetDocumentsResponse = PaginationResponse<
  Document & {
    indexation: Indexation
    documentType: DocumentType
    dueDate: string
    status: 'inDay' | 'near' | 'won'
  }
>
