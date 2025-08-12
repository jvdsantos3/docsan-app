import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useProfessional } from '@/http/use-professional'
import { useSearchParams } from 'react-router-dom'
// import { DetailsSkeleton } from './details-skeleton'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'
// import { Badge } from '@/components/ui/badge'
// import { useProfile } from '@/http/use-profile'

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
  const { data: professional } = useProfessional(professionalId)

  if (!professional) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white flex flex-col max-h-[85vh] sm:max-w-[30vw]">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-blue-1000 font-bold font-lato">
            Detalhes do profissional
          </DialogTitle>

          <Badge className={`mr-10 p-1`}>{professional.status}</Badge>
        </DialogHeader>

        <div className="overflow-auto">
          <div className="space-y-4">
            <div>
              <p className="text-blue-1000 text-sm">Informações pessoais</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 font-lato">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600 ">Nome completo</Label>
                  <p className="text-sm font-medium">{professional.name}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">CPF</Label>
                  <p className="text-sm font-medium">{professional.cpf}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Data de nascimento</Label>
                  <p className="text-sm font-medium">
                    {professional.birthDate &&
                      format(professional.birthDate, 'P', {
                        locale: ptBR,
                      })}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">E-mail</Label>
                  <p className="text-sm font-medium">{professional.email}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Telefone</Label>
                  <p className="text-sm font-medium">{professional.phone}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Data de cadastro</Label>
                  <p className="text-sm font-medium">
                    {professional.createdAt &&
                      format(professional.createdAt, 'P', {
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
                    {professional.fieldActivity}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Registro profissional</Label>
                  <p className="text-sm font-medium">{professional.registry}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Uf do registro</Label>
                  <p className="text-sm font-medium">
                    {professional.registryUf}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label className="text-gray-600">CNAE</Label>
                  <p className="text-sm font-medium">{professional.cnae}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-blue-1000 text-sm">Endereço</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 font-lato">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600 ">CEP</Label>
                  <p className="text-sm font-medium">{professional.name}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">UF</Label>
                  <p className="text-sm font-medium">
                    {professional.registryUf}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Cidade</Label>
                  <p className="text-sm font-medium">{professional.name}</p>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label className="text-gray-600">Rua</Label>
                  <p className="text-sm font-medium">{professional.email}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Número</Label>
                  <p className="text-sm font-medium">{professional.phone}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Bairro</Label>
                  <p className="text-sm font-medium">{professional.name}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-600">Complemento</Label>
                  <p className="text-sm font-medium">{professional.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <DialogFooter>
          <div className="w-full flex flex-row justify-between gap-4">
            <Button
              className="w-2/4 text-red-600 border-red-600"
              type="button"
              variant="outline"
            >
              <X />
              Reprovar
            </Button>
            <Button className="w-2/4 bg-green-700 font-bold" type="button">
              <Check />
              Aprovar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
