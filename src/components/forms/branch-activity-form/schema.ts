import { z } from 'zod'

export const branchActivityFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome da área de atuação é obrigatório'),
})

export type BranchActivityFormSchema = z.infer<typeof branchActivityFormSchema>
