export type CreateDocumentTypeRequest = {
  name: string
  fields: {
    name: string
    type: 'text' | 'number' | 'date'
    required: boolean
  }[]
}