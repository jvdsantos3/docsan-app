import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { documentTypes } from '@/data/mockups/document-types'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { columns } from './columns'

export const DocumentTypes = () => {
  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl">Meus tipos documentos</h1>
          <p className="font-medium text-lg mt-4">Descrição bem descrita</p>
        </div>

        {
          <Button className="font-bold text-base" size="lg" asChild>
            <Link to="new">
              <Plus />
              Adicionar tipo de documento
            </Link>
          </Button>
        }
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100">
          <DataTable columns={columns} data={documentTypes} />
        </div>
      </div>
    </div>
  )
}
