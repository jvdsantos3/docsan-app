import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, '')

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

  let sum = 0
  let remainder

  // First digit
  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false

  // Second digit
  sum = 0
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false

  return true
}

export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '')

  if (cnpj.length !== 14) return false

  // Reject known invalid sequences
  if (/^(\d)\1+$/.test(cnpj)) return false

  const calc = (length: number) => {
    let sum = 0
    let pos = length - 7
    for (let i = length; i >= 1; i--) {
      sum += parseInt(cnpj.charAt(length - i)) * pos--
      if (pos < 2) pos = 9
    }
    const result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    return result
  }

  const firstCheck = calc(12)
  const secondCheck = calc(13)

  return (
    firstCheck === parseInt(cnpj.charAt(12)) &&
    secondCheck === parseInt(cnpj.charAt(13))
  )
}
