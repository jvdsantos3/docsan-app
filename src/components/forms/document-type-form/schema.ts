import { z } from 'zod'

export const MAX_FIELDS = 7

export const documentTypeFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome do tipo de documento é obrigatório'),
  validityPeriod: z.coerce
    .number()
    .nonnegative('O período de validade deve ser um número positivo.')
    .min(7, 'O período de validade deve ser de pelo menos 7 dias.'),
  fields: z
    .array(
      z.object({
        name: z.string().trim().min(1, 'O nome do campo é obrigatório'),
        type: z.enum(['text', 'number', 'date']),
        required: z.boolean(),
      }),
    )
    .min(1, 'Pelo menos um campo é obrigatório.')
    .max(MAX_FIELDS),
})

export type DocumentTypeFormSchema = z.infer<typeof documentTypeFormSchema>
