import { useProfessionalsSummary } from '@/http/use-professionals-summary'

export const ProfessionalsSummary = () => {
  const { data: response } = useProfessionalsSummary()

  return (
    <div className="flex gap-4 lg:flex-row flex-col flex-wrap">
      <div className="font-lato bg-white border  py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Total de profissionais</p>
        <div className="text-blue-source text-3xl">
          {response?.summary.total}
        </div>
      </div>

      <div className="font-lato bg-white border  py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Aprovados</p>
        <div className="text-blue-source text-3xl">
          {response?.summary.totalApproved}
        </div>
      </div>

      <div className="font-lato bg-white border  py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Pendentes</p>
        <div className="text-blue-source text-3xl">
          {response?.summary.totalPending}
        </div>
      </div>

      <div className="font-lato bg-white border  py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Reprovados</p>
        <div className="text-blue-source text-3xl">
          {response?.summary.totalRejected}
        </div>
      </div>

      <div className="font-lato bg-white border  py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Banidos</p>
        <div className="text-blue-source text-3xl">
          {response?.summary.totalBanned}
        </div>
      </div>
    </div>
  )
}
