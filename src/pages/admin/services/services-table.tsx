import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { AppPagination } from '@/components/app-pagination'
import { ServicesFilters } from './services-filters'

const services = [
  {
    id: 'dasd-fdgsdg-432aasd-5adas',
    imageUrl: '',
    title: 'Consulta Médica',
    description: 'Consulta médica geral com um profissional qualificado.',
  },
  {
    id: 'dasd-fdgsdg-432aasd-5ada5',
    imageUrl: '',
    title: 'Exame de Sangue',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
]

export const ServicesTable = () => {
  return (
    <div>
      <div className="px-4 py-3 md:px-8 md:py-6 flex justify-between items-center">
        <h2 className="font-bold md:text-[21px] text-blue-1000">Serviços</h2>

        <ServicesFilters />
      </div>

      <div>
        <DataTable columns={columns} data={services} />
        <AppPagination currentPage={1} totalPages={1} />
      </div>
    </div>
  )
}
