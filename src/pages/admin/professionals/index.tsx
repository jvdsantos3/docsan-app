import { CornerUpLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProfessionalsDataTable } from './professionals-table'
import { useNavigate } from 'react-router-dom'
import { ProfessionalsSummary } from './summary'

export const Professionals = () => {
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
            <h1 className="font-lato text-3xl">Gestão de Profissionais</h1>
            <p className="font-lato font-medium text-lg mt-4">
              Gerencie os cadastros de profissionais da plataforma DocSan.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <ProfessionalsSummary />

          <div className="space-y-8">
            <div className="bg-white rounded-lg border border-gray-100">
              <ProfessionalsDataTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
