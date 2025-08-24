import { Button } from '@/components/ui/button'
import { CornerUpLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ServiceForm } from './components/service-form'

export const NewService = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-8 py-6">
      <Button
        type="button"
        variant="link"
        className="text-blue-source"
        onClick={() => navigate(-1)}
      >
        <CornerUpLeft /> Voltar
      </Button>

      <div>
        <h1 className="font-lato font-bold text-3xl text-blue-1000">
          Adicionar Serviço
        </h1>
        <p className="font-lato font-normal text-base text-gray-800 mt-4">
          Adicione um novo serviço à plataforma, definindo suas características
          e funcionalidades.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl space-y-6">
        <ServiceForm />
      </div>
    </div>
  )
}
