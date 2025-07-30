import type { Address } from '@/types/address'
import type { Company } from '@/types/company'
import type { Owner } from '@/types/owner'
import type { User } from '@/types/user'

export type GetProfileResponse = {
  user: User & {
    owner: (Owner & { company: Company & { address: Address } }) | null
    professional: unknown | null
  }
}
