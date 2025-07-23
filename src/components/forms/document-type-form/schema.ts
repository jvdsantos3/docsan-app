import { z } from 'zod'

export const MAX_FIELDS = 7

export const documentTypeFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome do tipo de documento é obrigatório'),
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
