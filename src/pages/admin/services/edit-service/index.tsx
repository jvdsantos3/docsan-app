import { Button } from '@/components/ui/button'
import { CornerUpLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { ServiceForm } from '../components/service-form'
import { toast } from 'sonner'
import { useUpdateService } from '@/http/use-update-service'
import type { UpdateServiceRequest } from '@/types/http/update-service-request'

export const EditService = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { mutateAsync: updateServiceFn } = useUpdateService()

  const handleUpdateService = async (data: UpdateServiceRequest) => {
    if (!id) return
    await updateServiceFn({ id, data })
    toast.success('Serviço atualizado com sucesso!', { richColors: true })
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
          Alterar Serviço
        </h1>
        <p className="font-lato font-normal text-base text-gray-800 mt-4">
          Altere as informações do serviço selecionado.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl space-y-6">
        <ServiceForm onSubmit={handleUpdateService} />
      </div>
    </div>
  )
}
