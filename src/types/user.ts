import type { Company } from './company'

export type Role = 'OWNER' | 'PROFESSIONAL'

export type OwnerProfile = {
  id: string
  name: string
  cpf: string
  phone: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
  companyId: string
  company: Company
}

export type User = {
  id: string
  role: Role
  profile?: OwnerProfile // | ProfessionalProfile
}
