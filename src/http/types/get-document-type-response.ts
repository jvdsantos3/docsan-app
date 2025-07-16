import type { DocumentType } from '@/types/document-type'

export type GetDocumentTypeResponse = DocumentType & {
  // _count: {
  //   documents: number
  // }
  metadata: {
    name: string
    type: string
    required: boolean
  }[]
}
