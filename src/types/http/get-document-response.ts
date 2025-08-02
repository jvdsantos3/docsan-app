import type { Document } from '@/types/document'
import type { DocumentNotification } from '@/types/document-notification'
import type { DocumentType } from '@/types/document-type'
import type { Indexation } from '@/types/indexation'
import type { ActionLog } from '../action-log'

export type GetDocumentResponse = Document & {
  indexation: Indexation
  documentType: DocumentType
  actionLog: ActionLog[]
  status: 'Up_to_date' | 'Due_soon' | 'Overdue'
  documentNotification: DocumentNotification | null
}
