import type { Address } from './address'

export type Company = {
  id: string
  name: string
  tradeName: string
  cnpj: string
  cnae: string
  createdAt: string
  updatedAt: string
  addressId: string
  address: Address
}
