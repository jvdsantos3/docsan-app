import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ServicesTable } from './services-table'

export const Services = () => {
  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="font-lato text-xl md:text-2xl lg:text-3xl">
            Serviços da plataforma
          </h1>
          <p className="font-lato font-medium lg:text-lg mt-2 lg:mt-4">
            Cadastre e gerencie os serviços ofertados na plataforma.
          </p>
        </div>

        <Button className="font-bold w-full md:w-auto" onClick={() => {}}>
          <Plus />
          Adicionar Serviço
        </Button>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100">
          <ServicesTable />
        </div>
      </div>
    </div>
  )
}
