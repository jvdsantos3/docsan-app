import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DocumentsDataTable } from './data-table'
import { Link } from 'react-router-dom'

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

        {
          <Button className="font-bold" asChild>
            <Link to="new">
              <Plus />
              Adicionar documento
            </Link>
          </Button>
        }
      </div>

      <div className="space-y-8">
        <div className="flex gap-4">
          <div className="font-lato bg-white border border-[#d82020] py-4 px-6 rounded-xl min-w-52 space-y-3">
            <p className="text-sm text-gray-600">Documentos vencidos</p>
            <div className="text-[#d82020] text-3xl">2</div>
          </div>
          <div className="font-lato bg-white border border-[#F58F00] py-4 px-6 rounded-xl min-w-52 space-y-3">
            <p className="text-sm text-gray-600">Próximos do vencimento</p>
            <div className="text-[#F58F00] text-3xl">6</div>
          </div>
          <div className="font-lato bg-white border border-green-700 py-4 px-6 rounded-xl min-w-52 space-y-3">
            <p className="text-sm text-gray-600">Documentos em dia</p>
            <div className="text-green-700 text-3xl">12</div>
          </div>
        </div>

        <DocumentsDataTable />
      </div>
    </div>
  )
}
