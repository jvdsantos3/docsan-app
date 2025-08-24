export interface CreateProfessionalRequest {
  name: string
  cpf: string
  birthDate: Date
  email: string
  password: string
  phone: string
  classification: 'PERSON' | 'COMPANY'
  cnpj?: string
  cnaeId?: string
  branchActivityId: string
  registryTypeId: string
  registry: string
  registryUf: string
  zipCode: string
  uf: string
  city: string
  street: string
  number: string
  neighborhood: string
  complement?: string
  terms: boolean
}