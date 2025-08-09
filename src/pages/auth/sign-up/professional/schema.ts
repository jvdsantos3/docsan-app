import { z } from 'zod'
import { isValidCPF } from '@/lib/utils'

const MIN_AGE = 18
const today = new Date()
const cutoffDate = new Date(
  today.getFullYear() - MIN_AGE,
  today.getMonth(),
  today.getDate(),
)

export const professionalSignUpFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nome completo é obrigatório.')
    .regex(
      /^[\p{L}'’-]+(?: [\p{L}'’-]+)+$/u,
      'Por favor, insira seu nome completo.',
    ),
  cpf: z
    .string()
    .transform((cpf) => cpf.replace(/[^\d]+/g, ''))
    .refine((cpf) => cpf.length === 11, {
      message: 'O CPF deve ter 11 dígitos.',
    })
    .refine((cpf) => isValidCPF(cpf), {
      message: 'CPF inválido.',
    }),
  birthDate: z
    .date({ required_error: 'Data de nascimento é obrigatória' })
    .refine((date) => date <= cutoffDate, {
      message: `Você deve ter pelo menos ${MIN_AGE} anos.`,
    }),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  phone: z
    .string()
    .nonempty('O telefone é obrigatório.')
    .transform((phone) => phone.replace(/[^\d]+/g, '')),
  branchActivity: z.string().nonempty('Ramo de atuação é obrigatório.'),
  registryType: z.string().nonempty('Tipo de registro é obrigatório.'),
  professionalRegistry: z
    .string()
    .nonempty('Registro profissional é obrigatório.'),
  registryUf: z.string().nonempty('UF do registro é obrigatório.'),
  cnae: z.string().nonempty('O CNAE é obrigatório'),
  zipCode: z
    .string()
    .nonempty('O CEP é obrigatório.')
    .transform((zipCode) => zipCode.replace(/[^\d]+/g, '')),
  uf: z.string().nonempty('UF é obrigatória.'),
  city: z.string().nonempty('Cidade é obrigatória.'),
  street: z.string().nonempty('Rua é obrigatória.'),
  number: z.string().nonempty('Número é obrigatório.'),
  neighborhood: z.string().nonempty('Bairro é obrigatório'),
  complement: z.string().optional(),
  terms: z.boolean().refine((val) => val, {
    message: 'Você deve aceitar os termos de uso',
  }),
})

export type ProfessionalSignUpFormSchema = z.infer<
  typeof professionalSignUpFormSchema
>
