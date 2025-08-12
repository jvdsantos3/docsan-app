import type { Address } from '../address'
import type { BranchActivity } from '../branch-activity'
import type { Cnae } from '../cnae'
import type { Professional } from '../professional'
import type { RegistryType } from '../registry-type'
import type { User } from '../user'

export type GetProfessionalResponse = {
  professional: Professional & {
    user: {
      email: User['email']
    }
    address: Address
    cnae: {
      code: Cnae['code']
      description: Cnae['description']
    }
    branchActivity: {
      name: BranchActivity['name']
    }
    registryType: {
      name: RegistryType['name']
    }
  }
}
