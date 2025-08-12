import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CNAEsTable } from './cnaes-table'
import { useState } from 'react'
import { RegisterCnaeDialog } from './components/register-cnae-dialog'

export const CNAEs = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="font-lato text-xl md:text-2xl lg:text-3xl">
            Classificação Nacional de Atividades Econômicas
          </h1>
          <p className="font-lato font-medium lg:text-lg mt-2 lg:mt-4">
            Cadastre e gerencie os CNAEs da sua empresa para garantir a
            regularização fiscal e tributária.
          </p>
        </div>

        <Button
          className="font-bold w-full md:w-auto"
          onClick={() => setOpen(true)}
        >
          <Plus />
          Adicionar CNAE
        </Button>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100">
          <CNAEsTable />
        </div>
      </div>

      <RegisterCnaeDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
