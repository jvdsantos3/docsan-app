import { Badge } from '@/components/ui/badge'

export function getLeadStatusBadge(
  status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'LOST',
) {
  switch (status) {
    case 'NEW':
      return (
        <Badge className="bg-blue-500 font-lato font-bold text-white">
          Novo
        </Badge>
      )
    case 'CONTACTED':
      return (
        <Badge className="bg-[#F58F00] font-lato font-bold text-white">
          Em contato
        </Badge>
      )
    case 'CONVERTED':
      return (
        <Badge className="bg-green-700 font-lato font-bold text-white">
          Convertido
        </Badge>
      )
    case 'LOST':
      return (
        <Badge variant="destructive" className="font-lato font-bold text-white">
          Perdido
        </Badge>
      )
  }
}
