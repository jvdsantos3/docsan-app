import type { Document } from '@/types/document'
import type { DocumentType } from '@/types/document-type'
import type { Indexation } from '@/types/indexation'

export type GetDocumentResponse = Document & {
  indexation: Indexation
  documentType: DocumentType
  actionLog: []
  duedate: Date
  status: 'inDay' | 'near' | 'won'
}
