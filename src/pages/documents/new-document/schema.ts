import { z } from 'zod'

export const maxSize = 10 * 1024 * 1024 // 10MB default

export const acceptedFileTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const newDocumentFormSchema = z.object({
  documentTypeId: z.string().nonempty('Tipo de documento é obrigatório.'),
  file: z
    .instanceof(File, { message: 'Selecione um arquivo.' })
    .optional()
    .refine((file) => file === undefined || file.size <= maxSize, {
      message: 'Arquivo deve ter até 10 MB.',
    })
    .refine((file) => file === undefined || acceptedFileTypes.includes(file.type), {
      message: 'Apenas arquivos PDF, JPG, PNG, DOC ou DOCX são permitidos.',
    }),
})
// .superRefine((data, ctx) => {
//   if (data.file === undefined) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'Selecione um arquivo.',
//       path: ['file'],
//     })
//   }
//   if (data.file && data.file.size > maxSize) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'Arquivo deve ter até 10 MB.',
//       path: ['file'],
//     })
//   }
//   if (data.file && !acceptedFileTypes.includes(data.file.type)) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'Apenas arquivos PDF, JPG, PNG, DOC ou DOCX são permitidos.',
//       path: ['file'],
//     })
//   }
// })

export type NewDocumentFormSchema = z.infer<typeof newDocumentFormSchema>
