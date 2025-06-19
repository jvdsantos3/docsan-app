import { z } from 'zod'

export const professionalSignUpFormSchema = z.object({
  fullName: z.string().min(2, 'Nome completo é obrigatório'),
  cpf: z.string().min(1, 'CPF é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  fieldOfActivity: z.string().min(1, 'Ramo de atuação é obrigatório'),
  proRegistration: z.string().min(1, 'Registro profissional é obrigatório'),
  proRegistrationState: z.string().min(1, 'UF do registro é obrigatório'),
  cnae: z.string().min(1, 'CNAE é obrigatório'),
  address: z.object({
    zipCode: z.string().min(1, 'CEP é obrigatório'),
    state: z.string().min(1, 'UF é obrigatória'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  }),
  terms: z.boolean().refine((val) => val, {
    message: 'Você deve aceitar os termos de uso',
  }),
})

export type ProfessionalSignUpFormSchema = z.infer<typeof professionalSignUpFormSchema>
