import {z} from 'zod'

export const schema = z.object({
  page: z.number().nonnegative().optional(),
  limit: z.number().nonnegative().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  orderBy: z.string().trim().optional(),
  type: z.string().optional(),
  status: z.enum(['inDay', 'near', 'won']).optional(),
  filter: z.string().trim().optional(),
})

export type GetDocumentsSearchParams = z.infer<typeof schema>