export type DocumentType = {
  id: string
  name: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  companyId: string
  professionalId: string | null
  metadata: {
    name: string
    type: string
    required: boolean
  }[]
}
