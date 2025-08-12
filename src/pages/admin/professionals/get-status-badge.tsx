import { Badge } from '@/components/ui/badge'

export function getStatusBadge(
  status: 'REJECTED' | 'PENDING' | 'BANNED' | 'APPROVED',
) {
  switch (status) {
    case 'REJECTED':
      return (
        <Badge variant="destructive" className="font-lato font-bold text-white">
          Reprovado
        </Badge>
      )
    case 'PENDING':
      return (
        <Badge className="bg-[#F58F00] font-lato font-bold text-white">
          Pendente
        </Badge>
      )
    case 'BANNED':
      return (
        <Badge className="bg-red-950 font-lato font-bold text-white">
          Banido
        </Badge>
      )
    case 'APPROVED':
      return (
        <Badge className="bg-green-700 font-lato font-bold text-white">
          Aprovado
        </Badge>
      )
  }
}
