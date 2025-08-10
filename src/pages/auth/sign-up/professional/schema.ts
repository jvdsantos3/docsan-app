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
  classification: z.enum(['cpf', 'cnpj'], {
    required_error: 'Classificação é obrigatória.',
  }),
  cnpj: z
    .string()
    .trim()
    .transform((cnpj) => cnpj.replace(/[^\d]+/g, ''))
    .optional(),
  cnae: z.string().trim().optional(),
  branchActivity: z.string().min(1, 'Ramo de atuação é obrigatório.'),
  registryType: z.string().min(1, 'Tipo de registro é obrigatório.'),
  professionalRegistry: z
    .string()
    .min(1, 'Registro profissional é obrigatório.'),
  registryUf: z.string().min(1, 'UF do registro é obrigatório.'),
  zipCode: z
    .string()
    .min(1, 'O CEP é obrigatório.')
    .transform((zipCode) => zipCode.replace(/[^\d]+/g, '')),
  uf: z.string().min(1, 'UF é obrigatória.'),
  city: z.string().min(1, 'Cidade é obrigatória.'),
  street: z.string().min(1, 'Rua é obrigatória.'),
  number: z.string().min(1, 'Número é obrigatório.'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  complement: z.string().optional(),
  terms: z.boolean().refine((val) => val, {
    message: 'Você deve aceitar os termos de uso',
  }),
})

export type ProfessionalSignUpFormSchema = z.infer<
  typeof professionalSignUpFormSchema
>
