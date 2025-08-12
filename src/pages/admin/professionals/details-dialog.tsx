import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useProfessional } from '@/http/use-professional'
import { useSearchParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { formatCPFCNPJ, formatZipCode, formatPhone } from '@/utils/format'
import { getStatusBadge } from './get-status-badge'

type ProfessionalDetailsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ProfessionalDetailsDialog = ({
  open,
  onOpenChange,
}: ProfessionalDetailsDialogProps) => {
  const [searchParams] = useSearchParams()
  const professionalId = searchParams.get('professionalId') ?? ''
  const { data: response } = useProfessional(professionalId)

  if (!response) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white flex flex-col max-h-[85vh] sm:max-w-[40vw]">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-blue-1000 font-bold font-lato">
            Detalhes do profissional
          </DialogTitle>
          <div className="mr-10 p-1">
            {getStatusBadge(response.professional.status)}
          </div>
        </DialogHeader>

        <div className="overflow-auto">
          <div className="space-y-4">
            <div>
              <p className="text-blue-1000 text-sm">Informações pessoais</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 font-lato">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600 ">Nome completo</Label>
                  <p className="text-sm font-medium">
                    {response.professional.name}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">CPF</Label>
                  <p className="text-sm font-medium">
                    {formatCPFCNPJ(response.professional.cpf)}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Data de nascimento</Label>
                  <p className="text-sm font-medium">
                    {response.professional.birthDate &&
                      format(response.professional.birthDate, 'P', {
                        locale: ptBR,
                      })}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">E-mail</Label>
                  <p className="text-sm font-medium break-words">
                    {response.professional.user.email}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Telefone</Label>
                  <p className="text-sm font-medium">
                    {formatPhone(response.professional.phone)}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Data de cadastro</Label>
                  <p className="text-sm font-medium">
                    {response.professional.createdAt &&
                      format(response.professional.createdAt, 'P', {
                        locale: ptBR,
                      })}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-blue-1000">
                Informações profissionais
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 font-lato">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Ramo de atuação</Label>
                  <p className="text-sm font-medium">
                    {response.professional.branchActivity.name}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Tipo de registro</Label>
                  <p className="text-sm font-medium">
                    {response.professional.registryType.name}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Registro profissional</Label>
                  <p className="text-sm font-medium">
                    {response.professional.registry}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Uf do registro</Label>
                  <p className="text-sm font-medium">
                    {response.professional.registryUf}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label className="text-gray-600">CNAE</Label>
                  <p className="text-sm font-medium">
                    {response.professional.cnae.code}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-blue-1000 text-sm">Endereço</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 font-lato">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600 ">CEP</Label>
                  <p className="text-sm font-medium">
                    {formatZipCode(response.professional.address.zipCode)}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">UF</Label>
                  <p className="text-sm font-medium">
                    {response.professional.address.uf}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Cidade</Label>
                  <p className="text-sm font-medium">
                    {response.professional.address.city}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label className="text-gray-600">Rua</Label>
                  <p className="text-sm font-medium">
                    {response.professional.address.street}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Número</Label>
                  <p className="text-sm font-medium">
                    {response.professional.address.number}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Bairro</Label>
                  <p className="text-sm font-medium">
                    {response.professional.address.neighborhood}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Complemento</Label>
                  <p className="text-sm font-medium">
                    {response.professional.address.complement}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
