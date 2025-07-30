import type { Company } from './company'
import type { DocumentType } from './document-type'

export type Document = {
  id: string
  name: string
  duedate: Date
  url: string
  version: number
  isLatest: boolean
  createdAt: Date
  updatedAt: Date
  companyId: Company['id']
  documentTypeId: DocumentType['id']
}
