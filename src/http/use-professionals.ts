// import { api } from '@/lib/axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { GetProfessionalsSearchParams } from '@/types/http/get-professionals-search-params'
// import { createQueryStringClean } from '@/utils/create-query-string-clean'
// import type { GetProfessionalsResponse } from '@/types/http/get-professionals-response'

export const useProfessionals = (
  // companyId: string,
  params: GetProfessionalsSearchParams = {},
) => {
  return useQuery({
    queryKey: ['professionals', params],
    queryFn: async () => {
      // const searchParams = createQueryStringClean(params)
      // const response = await api.get<GetProfessionalsResponse>(
      //   `/company/${companyId}/documents?${searchParams}`,
      // )
      // return response.data

      const response = {
        data: [
          {
            id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
            name: "Felippe Santana",
            cpf: "123.456.789-00",
            birthDate: "1990-01-01",
            phone: "1234567890",
            fieldActivity: "Saúde",
            registry: "123456",
            registryUf: "CE",
            cnae: "1234567",
            email: "teste@gmail.com",
            createdAt: new Date("2025-07-30T14:09:16.482Z"),
            updatedAt: new Date("2025-07-30T14:09:16.482Z"),
            addressId: "b7323166-5d06-4dfe-a4a6-1a4b888dfc89",
            userId: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
            status: 'repproved'
          },
          {
            id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
            name: "João Vitor Raulino",
            cpf: "123.456.789-00",
            birthDate: "1990-01-01",
            email: "jvitornunes09@gmail.com",
            phone: "1234567890",
            fieldActivity: "Saúde",
            registry: "123456",
            registryUf: "CE",
            cnae: "1234567",
            createdAt: new Date("2025-07-30T14:09:16.482Z"),
            updatedAt: new Date("2025-07-30T14:09:16.482Z"),
            addressId: "b7323166-5d06-4dfe-a4a6-1a4b888dfc89",
            userId: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
            status: 'pending'
          },
          {
            id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
            name: "João Vitor Alcantara",
            cpf: "123.456.789-00",
            birthDate: "1990-01-01",
            email: "jvitoralcantara09@gmail.com",
            phone: "1234567890",
            fieldActivity: "Saúde",
            registry: "123456",
            registryUf: "CE",
            cnae: "1234567",
            createdAt: new Date("2025-07-30T14:09:16.482Z"),
            updatedAt: new Date("2025-07-30T14:09:16.482Z"),
            addressId: "b7323166-5d06-4dfe-a4a6-1a4b888dfc89",
            userId: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
            status: 'reproved'
          },
          {
            id: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
            name: "José",
            cpf: "123.456.789-00",
            birthDate: "1990-01-01",
            email: "jose@gmail.com",
            phone: "1234567890",
            fieldActivity: "Saúde",
            registry: "123456",
            registryUf: "CE",
            cnae: "1234567",
            createdAt: new Date("2025-07-30T14:09:16.482Z"),
            updatedAt: new Date("2025-07-30T14:09:16.482Z"),
            addressId: "b7323166-5d06-4dfe-a4a6-1a4b888dfc89",
            userId: "b7323166-5d06-4dfe-a4a6-1a4b888dfc90",
            status: 'in_correction'
          },
        ],
        first: 1,
        last: 1,
        current: 1,
        next: null,
        prev: null,
        total: 1
      }
      return response
    },
    placeholderData: keepPreviousData
  })
}
