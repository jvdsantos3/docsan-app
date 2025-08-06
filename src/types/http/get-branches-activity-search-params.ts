import { z } from 'zod'

export const schema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  active: z.boolean().optional(),
  filter: z.string().trim().optional(),
})

export type GetBranchesActivitySearchParams = z.infer<typeof schema>
