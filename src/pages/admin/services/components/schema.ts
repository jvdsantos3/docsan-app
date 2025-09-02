import { formatBytes } from '@/utils/format'
import { z } from 'zod'

export const MAX_LENGTH = 300
export const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB default

export const acceptedFileTypes = [
  'image/svg+xml',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
]

export const serviceSchema = z.object({
  name: z.string().min(1, 'Dê um nome ao serviço.'),
  summary: z
    .string()
    .min(1, 'Dê um resumo ao serviço.')
    .max(MAX_LENGTH, 'O resumo deve ter no máximo 300 caracteres.'),
  description: z.string().min(1, 'Dê uma descrição ao serviço.'),
  file: z
    .instanceof(File, { message: 'Selecione uma imagem.' })
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Arquivo deve ter até ${formatBytes(MAX_FILE_SIZE)}.`,
    })
    .refine((file) => !file || acceptedFileTypes.includes(file.type), {
      message: 'Apenas arquivos SVG, PNG, JPG ou GIF são permitidos.',
    }),
})

export type ServiceSchema = z.infer<typeof serviceSchema>
