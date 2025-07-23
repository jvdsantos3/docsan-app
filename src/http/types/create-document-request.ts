import { z } from 'zod'

export const schema = z.object({
  documentTypeId: z.string().uuid(),
  file: z.instanceof(File),
  fields: z.array(
    z.object({
      name: z.string().trim().min(1),
      value: z.string().optional(),
    }),
  ),
})

export type CreateDocumentRequest = z.infer<typeof schema>
