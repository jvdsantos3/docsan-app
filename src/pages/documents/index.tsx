import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DocumentsDataTable } from './data-table'
import { Link } from 'react-router-dom'
import { DocumentsSummary } from './summary'

export const Documents = () => {
  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between">
        <div>
          <h1 className="font-lato text-3xl">Meus documentos</h1>
          <p className="font-lato font-medium text-lg mt-4">
            Receba alertas antes do vencimento e mantenha sua regularização em
            dia.
          </p>
        </div>

        <Button className="font-bold" asChild>
          <Link to="new">
            <Plus />
            Adicionar documento
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        <DocumentsSummary />

        <div className="space-y-8">
          <div className="bg-white rounded-lg border border-gray-100">
            <DocumentsDataTable />
          </div>
        </div>
      </div>
    </div>
  )
}
