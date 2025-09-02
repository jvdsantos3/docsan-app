import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const ServicesTableSkeleton = () => {
  return (
    <div>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-medium text-gray-800 w-[200px] px-8">
              Nome
            </TableHead>
            <TableHead className="font-medium text-gray-800 w-[600px] px-8">
              Resumo
            </TableHead>
            <TableHead className="font-medium text-gray-800 px-8">
              Status
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
                <Skeleton className="h-6 w-16 bg-neutral-200" />
              </TableCell>
              <TableCell className="px-8">
                <Skeleton className="h-6 w-full bg-neutral-200" />
              </TableCell>
              <TableCell className="px-8">
                <Skeleton className="h-6 w-24 bg-neutral-200" />
              </TableCell>
              <TableCell className="px-8">
                <Skeleton className="size-9 rounded-full bg-neutral-200" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
