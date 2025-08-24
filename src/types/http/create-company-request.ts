export interface CreateCompanyRequest {
  name: string
  tradeName: string
  cnpj: string
  cnaeId: string
  ownerName: string
  ownerCpf: string
  phone: string
  ownerEmail: string
  password: string
  zipCode: string
  uf: string
  city: string
  street: string
  number: string
  neighborhood: string
  complement?: string
}