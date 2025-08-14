import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_GOOGLE_CLIENT_ID: z.string()
})

const config = envSchema.parse(import.meta.env)

export const env = config
