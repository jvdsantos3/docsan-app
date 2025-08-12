import type { Address } from './address'
import type { User } from './user'

export type Professional = {
  id: string
  name: string
  cpf: string
  birthDate: string
  phone: string
  fieldActivity: string
  registry: string
  registryUf: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'BANNED'
  rejectedUntil: Date | null
  cnae: string
  createdAt: Date
  updatedAt: Date
  addressId: Address['id']
  userId: User['id']
}
