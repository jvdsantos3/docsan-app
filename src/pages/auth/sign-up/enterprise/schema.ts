import { z } from 'zod'

export const enterpriseSignUpSchema = z.object({
  business: z.object({
    companyName: z
      .string()
      .min(1, 'A razão social da empresa deve ter pelo menos 1 caracteres'),
    tradeName: z
      .string()
      .min(1, 'O nome fantasia da empresa deve ter pelo menos 1 caracteres'),
    cnpj: z.string().min(14, 'O CNPJ deve ter pelo menos 14 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    cnae: z.string(),
    phone: z.string(),
  }),
  address: z.object({
    zipCode: z.string(),
    state: z.string(),
    city: z.string(),
    street: z.string(),
    number: z.string(),
    neighborhood: z.string(),
    complement: z.string().optional(),
  }),
  responsible: z.object({
    fullName: z.string(),
    cpf: z.string(),
  }),
  terms: z.boolean().refine((val) => val, {
    message: 'Você deve aceitar os termos de uso',
  }),
})

export type EnterpriseSignUpSchema = z.infer<typeof enterpriseSignUpSchema>
