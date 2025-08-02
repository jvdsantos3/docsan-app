import type { DocumentType } from '@/types/document-type'
import type { ActionLog } from '../action-log'

export type GetDocumentTypeResponse = DocumentType & {
  actionLogs: ActionLog[]
}
