export type CreateDocumentTypeRequest = {
  name: string
  validityPeriod: number
  prompt: string
  fields: {
    name: string
    type: 'text' | 'number' | 'date'
    required: boolean
  }[]
}
