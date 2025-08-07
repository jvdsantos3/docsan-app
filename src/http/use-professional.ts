// import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
// import type { GetProfessionalResponse } from '@/types/http/get-professional-response'
import type { Professional } from '@/types/professional'

export function useProfessional(
  professionalId: Professional['id'],
) {
  return useQuery({
    queryKey: ['get-professional', professionalId],
    queryFn: async () => {
      // const response = await api.get<GetProfessionalResponse>(
      //   `/professionals/${professionalId}`,
      // )
      // return response.data
      const response = {
          id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
          name: "João Vitor",
          cpf: "123.456.789-00",
          birthDate: "1990-01-01",
          phone: "1234567890",
          fieldActivity: "Saúde",
          registry: "123456",
          registryUf: "CE",
          cnae: "1234567",
          email: "jvitornunes09@gmail.com",
          createdAt: new Date("2025-07-30T14:09:16.482Z"),
          updatedAt: new Date("2025-07-30T14:09:16.482Z"),
          addressId: "b7323166-5d06-4dfe-a4a6-1a4b888dfc89",
          userId: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
          status: 'repproved'
      }
      return response
    },
    // enabled: !!professionalId ,
  })
}
