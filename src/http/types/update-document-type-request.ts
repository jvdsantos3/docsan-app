export type UpdateDocumentTypeRequest = {
  name: string
  validityPeriod: number
  fields: {
    name: string
    type: 'text' | 'number' | 'date'
    required: boolean
  }[]
}
