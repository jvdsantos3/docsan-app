const mockLeadsSummary = {
  total: 156,
  totalNew: 42,
  totalContacted: 38,
  totalConverted: 54,
  totalLost: 22,
}

export const LeadsSummary = () => {
  return (
    <div className="flex gap-4 lg:flex-row flex-col flex-wrap">
      <div className="font-lato bg-white border py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Total de leads</p>
        <div className="text-blue-source text-3xl">
          {mockLeadsSummary.total}
        </div>
      </div>

      <div className="font-lato bg-white border py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Novos</p>
        <div className="text-blue-source text-3xl">
          {mockLeadsSummary.totalNew}
        </div>
      </div>

      <div className="font-lato bg-white border py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Em contato</p>
        <div className="text-blue-source text-3xl">
          {mockLeadsSummary.totalContacted}
        </div>
      </div>

      <div className="font-lato bg-white border py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Convertidos</p>
        <div className="text-blue-source text-3xl">
          {mockLeadsSummary.totalConverted}
        </div>
      </div>

      <div className="font-lato bg-white border py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Perdidos</p>
        <div className="text-blue-source text-3xl">
          {mockLeadsSummary.totalLost}
        </div>
      </div>
    </div>
  )
}
