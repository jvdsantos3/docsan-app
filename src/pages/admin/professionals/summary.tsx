import { useProfessionalsSummary } from '@/http/use-professionals-summary'
// import { useProfile } from '@/http/use-profile'

export const ProfessionalsSummary = () => {
  // const { data: profile } = useProfile()
  const { data: response } = useProfessionalsSummary(
    // profile?.user.owner?.companyId || '',
  )

  return (
    <div className="flex gap-4 lg:flex-row flex-col">
      <div className="font-lato bg-white border  py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Total de profissionais</p>
        <div className="text-blue-source text-3xl">{response?.summary.total}</div>
      </div>

      <div className="font-lato bg-white border  py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Aprovados</p>
        <div className="text-blue-source text-3xl">{response?.summary.approved}</div>
      </div>

      <div className="font-lato bg-white border  py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Pendentes</p>
        <div className="text-blue-source text-3xl">{response?.summary.pending}</div>
      </div>

      <div className="font-lato bg-white border  py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Reprovados</p>
        <div className="text-blue-source text-3xl">{response?.summary.reproved}</div>
      </div>
    </div>
  )
}
