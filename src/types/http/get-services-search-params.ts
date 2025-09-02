import { z } from 'zod'

export const schema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  orderBy: z.enum(['name', 'isHighlighted', 'createdAt', 'status']).optional(),
  status: z.boolean().optional(),
  highlight: z.boolean().optional(),
  filter: z.string().trim().optional(),
})

export type GetServicesSearchParams = z.infer<typeof schema>
