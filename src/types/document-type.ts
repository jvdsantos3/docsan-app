import type { Company } from './company'

export type DocumentType = {
  id: string
  name: string
  validityPeriod: number
  prompt: string
  isActive: boolean
  metadata: {
    name: string
    type: string
    required: boolean
  }[]
  createdAt: Date
  updatedAt: Date
  companyId: Company['id']
}
