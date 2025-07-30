import type { DocumentType } from './document-type'
import type { Document } from './document'

export type DocumentTypeVersion = Document & {
  documentType: DocumentType,
  status: string
}
