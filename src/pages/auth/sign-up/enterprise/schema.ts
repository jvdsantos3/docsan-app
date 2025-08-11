import { z } from 'zod'
import { isValidCNPJ, isValidCPF } from '@/lib/utils'

export const enterpriseSignUpSchema = z.object({
  company: z.object({
    name: z.string().nonempty('Nome é obrigatório.'),
    tradeName: z.string().nonempty('Nome fantasia é obrigatório.'),
    cnpj: z
      .string()
      .transform((cnpj) => cnpj.replace(/[^\d]+/g, ''))
      .refine((cnpj) => cnpj.length === 14, {
        message: 'O CNPJ deve ter pelo menos 14 caracteres.',
      })
      .refine((cnpj) => isValidCNPJ(cnpj), {
        message: 'CNPJ inválido.',
      }),
    cnaeId: z.string().nonempty('O CNAE é obrigatório.'),
  }),
  address: z.object({
    zipCode: z
      .string()
      .nonempty('O CEP é obrigatório.')
      .transform((zipCode) => zipCode.replace(/[^\d]+/g, '')),
    uf: z.string().nonempty('UF é obrigatória.'),
    city: z.string().nonempty('Cidade é obrigatória.'),
    street: z.string().nonempty('Rua é obrigatória.'),
    number: z.string().nonempty('Número é obrigatório.'),
    neighborhood: z.string().nonempty('Bairro é obrigatório.'),
    complement: z.string().optional(),
  }),
  owner: z.object({
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
    phone: z
      .string()
      .nonempty('O telefone é obrigatório')
      .transform((phone) => phone.replace(/[^\d]+/g, '')),
    email: z.string().email('E-mail inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  }),
  terms: z.boolean().refine((val) => val, {
    message: 'Você deve aceitar os termos de uso.',
  }),
})

// export const enterpriseSignUpSchema = z.object({
//   business: z.object({
//     companyName: z
//       .string()
//       .min(1, 'A razão social da empresa deve ter pelo menos 1 caracteres'),
//     tradeName: z
//       .string()
//       .min(1, 'O nome fantasia da empresa deve ter pelo menos 1 caracteres'),
//     cnpj: z
//       .string()
//       .transform((cnpj) => cnpj.replace(/[^\d]+/g, ''))
//       .refine((cnpj) => cnpj.length === 14, {
//         message: 'O CNPJ deve ter pelo menos 14 caracteres',
//       })
//       .refine((cnpj) => isValidCNPJ(cnpj), {
//         message: 'CNPJ inválido.',
//       }),
//     email: z.string().email('E-mail inválido'),
//     password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
//     cnae: z.string().nonempty('O CNAE é obrigatório.'),
//     phone: z
//       .string()
//       .nonempty('O telefone é obrigatório')
//       .transform((phone) => phone.replace(/[^\d]+/g, '')),
//   }),
//   address: z.object({
//     zipCode: z
//       .string()
//       .nonempty('O CEP é obrigatório.')
//       .transform((zipCode) => zipCode.replace(/[^\d]+/g, '')),
//     state: z.string().nonempty('UF é obrigatória.'),
//     city: z.string().nonempty('Cidade é obrigatória.'),
//     street: z.string().nonempty('Rua é obrigatória.'),
//     number: z.string().nonempty('Número é obrigatório.'),
//     neighborhood: z.string().nonempty('Bairro é obrigatório'),
//     complement: z.string().optional(),
//   }),
//   responsible: z.object({
//     fullName: z
//       .string()
//       .min(1, 'Nome completo é obrigatório.')
//       .regex(
//         /^[a-zA-Z'’]+(?: [a-zA-Z'’]+)+$/,
//         'Por favor, insira seu nome completo.',
//       ),
//     cpf: z
//       .string()
//       .transform((cpf) => cpf.replace(/[^\d]+/g, ''))
//       .refine((cpf) => cpf.length === 11, {
//         message: 'O CPF deve ter 11 dígitos.',
//       })
//       .refine((cpf) => isValidCPF(cpf), {
//         message: 'CPF inválido.',
//       }),
//   }),
//   terms: z.boolean().refine((val) => val, {
//     message: 'Você deve aceitar os termos de uso',
//   }),
// })

export type EnterpriseSignUpSchema = z.infer<typeof enterpriseSignUpSchema>
