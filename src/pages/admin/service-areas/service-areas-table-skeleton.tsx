import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const ServiceAreasTableSkeleton = () => {
  return (
    <div>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-medium text-gray-800 w-[600px] px-8">
              Nome
            </TableHead>
            <TableHead className="font-medium text-gray-800 px-8">
              Criado em
            </TableHead>
            <TableHead className="font-medium text-gray-800 px-8">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 15 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="px-8">
                <Skeleton className="h-6 w-full" />
              </TableCell>
              <TableCell className="px-8">
                <Skeleton className="h-6 w-32" />
              </TableCell>
              <TableCell className="px-8">
                <Skeleton className="size-9" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
