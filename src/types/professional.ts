import type { Address } from './address'
import type { User } from './user'

export type Professional = {
  id: string
  name: string
  cpf: string
  birthDate: string
  phone: string
  branchActivityId: string
  registry: string
  registryUf: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'BANNED'
  rejectedUntil: Date | null
  cnaeId: string
  registryTypeId: string
  createdAt: Date
  updatedAt: Date
  addressId: Address['id']
  userId: User['id']
}
