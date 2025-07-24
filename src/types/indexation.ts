import type { Document } from './document'

export type Indexation = {
  id: string
  values: JSON
  createdAt: Date
  updatedAt: Date
  documentId: Document['id']
}
