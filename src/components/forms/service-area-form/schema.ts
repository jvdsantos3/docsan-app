import { z } from 'zod'

export const serviceAreaFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome da área de atuação é obrigatório'),
})

export type ServiceAreaFormSchema = z.infer<typeof serviceAreaFormSchema>
