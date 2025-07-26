export function createQueryStringClean<T extends Record<string, unknown>>(
  params: T,
) {
  const filtered = Object.entries(params)
    .filter(
      ([, value]) => value !== undefined && value !== '' && value !== null,
    )
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

  return new URLSearchParams(filtered).toString()
}
