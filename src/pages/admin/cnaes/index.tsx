import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CNAEsTable } from './cnaes-table'

export const CNAEs = () => {
  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between">
        <div>
          <h1 className="font-lato text-3xl">
            Classificação Nacional de Atividades Econômicas
          </h1>
          <p className="font-lato font-medium text-lg mt-4">
            Cadastre e gerencie os CNAEs da sua empresa para garantir a
            regularização fiscal e tributária.
          </p>
        </div>

        <Button className="font-bold">
          <Plus />
          Adicionar CNAE
        </Button>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100">
          <CNAEsTable />
        </div>
      </div>
    </div>
  )
}
