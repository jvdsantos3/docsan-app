// export type OwnerProfile = {
//   id: string
//   name: string
//   cpf: string
//   phone: string
//   email: string
//   createdAt: string
//   updatedAt: string
//   companyId: string
//   company: Company
// }

import type { Owner } from "./owner"
import type { Professional } from "./professional"

// export type AuthUser = User & {
//   profile: OwnerProfile // | ProfessionalProfile
// }

export type Role = 'OWNER' | 'PROFESSIONAL'

export type User = {
  id: string
  email: string
  // password: string
  role: Role
  createdAt: Date
  updatedAt: Date
  owner?: Owner
  professional?: Professional
  // profile?: OwnerProfile // | ProfessionalProfile
}
