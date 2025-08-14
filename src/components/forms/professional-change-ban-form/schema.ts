import { z } from 'zod'

export const professionalChangeBanFormSchema = z.object({
  reason: z.string().trim().min(1, 'O motivo é obrigatório.'),
})

export type ProfessionalChangeBanFormSchema = z.infer<
  typeof professionalChangeBanFormSchema
>
