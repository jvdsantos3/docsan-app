import type { Professional } from '../professional'
import type { Service } from '../service'

export type GetServiceResponse = {
  service: Service & {
    professionals: Professional[]
    image?: {
      name: string
      type: string
      size: number
      base64: string
    }
  }
}
