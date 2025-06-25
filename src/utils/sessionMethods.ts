export function storeTokens(token: string) {
  sessionStorage.setItem("@docsan_token", token);
}

export function removeTokens() {
  sessionStorage.removeItem("@docsan_token");
}

export function getToken() {
  return sessionStorage.getItem("@docsan_token");
}
