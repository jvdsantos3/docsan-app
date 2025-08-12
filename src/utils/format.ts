export function formatCPFCNPJ(value?: string): string {
  if (!value) return ''
  const digits = value.replace(/\D/g, '')

  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  if (digits.length === 14) {
    return digits.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5',
    )
  }

  return value
}

export function formatPhone(phone?: string): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (digits.length === 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return phone
}

export function formatZipCode(zipCode?: string): string {
  if (!zipCode) return ''
  const digits = zipCode.replace(/\D/g, '')
  if (digits.length !== 8) return zipCode
  return digits.replace(/(\d{5})(\d{3})/, '$1-$2')
}
