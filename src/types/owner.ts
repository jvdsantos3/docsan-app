import type { Company } from './company'
import type { User } from './user'

export type Owner = {
  id: string
  name: string
  cpf: string
  phone: string
  createdAt: Date
  updatedAt: Date
  companyId: Company['id']
  userId: User['id']
}
