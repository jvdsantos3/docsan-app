import type { Professional } from '../professional'
import type { Service } from '../service'

export type GetServiceResponse = {
  service: Omit<Service, 'imageUrl'> & {
    professionals: Professional[]
    imageBase64?: string | null
  }
}
