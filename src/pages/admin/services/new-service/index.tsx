import { Button } from '@/components/ui/button'
import { CornerUpLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ServiceForm } from '../components/service-form'
import { useCreateService } from '@/http/use-create-service'
import { toast } from 'sonner'
import type { CreateServiceRequest } from '@/types/http/create-service-request'

export const NewService = () => {
  const navigate = useNavigate()
  const { mutateAsync: createServiceFn } = useCreateService()

  const handleCreateService = async (data: CreateServiceRequest) => {
    await createServiceFn(data)
    toast.success('Serviço criado com sucesso!', { richColors: true })
    navigate('/admin/services')
  }

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
        <ServiceForm onSubmit={handleCreateService} />
      </div>
    </div>
  )
}
