import { CornerUpLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LeadsDataTable } from './leads-table'
import { useNavigate } from 'react-router-dom'
import { LeadsSummary } from './summary'

export const Leads = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 py-6">
      <Button
        type="button"
        variant="link"
        className="text-blue-source"
        onClick={() => navigate(-1)}
      >
        <CornerUpLeft /> Voltar
      </Button>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex justify-between">
          <div>
            <h1 className="font-lato text-3xl">Gerenciamento de Leads</h1>
            <p className="font-lato font-medium text-lg mt-4">
              Gerencie os contatos interessados em seus serviços.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <LeadsSummary />

          <div className="space-y-8">
            <div className="bg-white rounded-lg border border-gray-100">
              <LeadsDataTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
