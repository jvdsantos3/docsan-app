import { z } from 'zod'

export const professionalReproveFormSchema = z.object({
  reason: z.string().trim().min(1, 'O motivo é obrigatório ao reprovar um profissional.'),
})

export type ProfessionalReproveFormSchema = z.infer<typeof professionalReproveFormSchema>
