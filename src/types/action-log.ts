import type { Company } from './company'
import type { Document } from './document'
import type { DocumentType } from './document-type'
import type { User } from './user'

export type ActionLog = {
  id: string
  action: string
  createdAt: Date
  updatedAt: Date
  companyId: Company['id']
  documentTypeId: DocumentType['id']
  documentId: Document['id']
  userId: User['id']
  user: User
}
