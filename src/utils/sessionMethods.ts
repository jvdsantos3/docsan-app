export function storeTokens(token: string) {
  localStorage.setItem('@docsan_token', token)
}

export function removeTokens() {
  localStorage.removeItem('@docsan_token')
}

export function getToken() {
  return localStorage.getItem('@docsan_token')
}
