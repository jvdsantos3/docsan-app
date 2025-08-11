import { z } from 'zod'

export const registryTypeFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome do tipo de registro profissional é obrigatório'),
})

export type RegistryTypeFormSchema = z.infer<typeof registryTypeFormSchema>
