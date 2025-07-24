import type { Document } from './document'

export type Indexation = {
  id: string
  values: {
    name: string
    value: string
    type: string
    required: boolean
  }[]
  createdAt: Date
  updatedAt: Date
  documentId: Document['id']
}
