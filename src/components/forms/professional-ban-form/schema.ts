import { z } from 'zod'

export const professionalBanFormSchema = z.object({
  reason: z.string().trim().min(1, 'O motivo é obrigatório ao reprovar um profissional.'),
})

export type ProfessionalBanFormSchema = z.infer<typeof professionalBanFormSchema>
