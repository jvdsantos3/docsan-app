import type { Role } from '@/types/user'

export const getRedirectPathByRole = (role: Role) => {
  switch (role) {
    case 'ADMIN':
      return '/admin/cnae'
    case 'PROFESSIONAL':
      return '/services'
    default:
      return '/documents'
  }
}
