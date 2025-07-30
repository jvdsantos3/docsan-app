import { useDocumentsSummary } from '@/http/use-documents-summary'
import { useProfile } from '@/http/use-profile'

export const DocumentsSummary = () => {
  const { data: profile } = useProfile()
  const { data: response } = useDocumentsSummary(
    profile?.user.owner?.companyId || '',
  )

  return (
    <div className="flex gap-4">
      <div className="font-lato bg-white border border-[#d82020] py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Documentos vencidos</p>
        <div className="text-[#d82020] text-3xl">{response?.summary.overdue}</div>
      </div>

      <div className="font-lato bg-white border border-[#F58F00] py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Próximos do vencimento</p>
        <div className="text-[#F58F00] text-3xl">{response?.summary.due_soon}</div>
      </div>

      <div className="font-lato bg-white border border-green-700 py-4 px-6 rounded-xl min-w-52 space-y-3">
        <p className="text-sm text-gray-600">Documentos em dia</p>
        <div className="text-green-700 text-3xl">{response?.summary.up_to_date}</div>
      </div>
    </div>
  )
}
