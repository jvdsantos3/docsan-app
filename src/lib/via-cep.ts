type ViaCepResponse = {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

type ZipCodeResponse = {
  success: boolean
  error?: string
  data?: ViaCepResponse
}

export const queryZipCode = async (
  zipCode: string,
): Promise<ZipCodeResponse> => {
  try {
    const value = zipCode.replace(/[^\d]+/g, '')
    const response = await fetch(`https://viacep.com.br/ws/${value}/json/`)
    const data = await response.json()

    if (data.erro) {
      return {
        success: false,
        error: 'InvalidZipCode',
      }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching zip code:', error)

    return {
      success: false,
      error: 'FetchError',
    }
  }
}
