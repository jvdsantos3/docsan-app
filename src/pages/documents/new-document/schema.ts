import { z } from 'zod'

export const newDocumentFormSchema = z.object({
  documentTypeId: z.string().nonempty('Tipo de documento é obrigatório.'),
})

export type NewDocumentFormSchema = z.infer<typeof newDocumentFormSchema>
