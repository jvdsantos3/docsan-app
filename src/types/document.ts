import type { Company } from './company'
import type { DocumentType } from './document-type'

export type Document = {
  id: string
  name: string
  url: string
  version: number
  createdAt: Date
  updatedAt: Date
  companyId: Company['id']
  documentTypeId: DocumentType['id']
}
