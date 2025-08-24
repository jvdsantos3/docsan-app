import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { columns, type Lead } from './columns'
import { LeadsFilters } from './leads-filters'
import { DataTable } from '@/components/ui/data-table'
import { LeadsPagination } from './leads-pagination'
import { LeadStatusChangeDialog } from './components/lead-status-change-dialog'

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    service: 'Consulta Cardiológica',
    status: 'NEW',
    email: 'joao.silva@email.com',
    phone: '85987161122',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Maria Santos',
    service: 'Tratamento Dermatológico',
    status: 'CONTACTED',
    email: 'maria.santos@email.com',
    phone: '11976543210',
    createdAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    service: 'Cirurgia Ortopédica',
    status: 'CONVERTED',
    email: 'carlos.oliveira@email.com',
    phone: '21965432109',
    createdAt: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    name: 'Ana Costa',
    service: 'Pediatria',
    status: 'LOST',
    email: 'ana.costa@email.com',
    phone: '31954321098',
    createdAt: '2024-01-12T16:45:00Z',
  },
  {
    id: '5',
    name: 'Pedro Almeida',
    service: 'Psicologia',
    status: 'NEW',
    email: 'pedro.almeida@email.com',
    phone: '41943210987',
    createdAt: '2024-01-11T11:30:00Z',
  },
  {
    id: '6',
    name: 'Juliana Ferreira',
    service: 'Ginecologia',
    status: 'CONTACTED',
    email: 'juliana.ferreira@email.com',
    phone: '51932109876',
    createdAt: '2024-01-10T13:20:00Z',
  },
  {
    id: '7',
    name: 'Roberto Lima',
    service: 'Clínica Geral',
    status: 'CONVERTED',
    email: 'roberto.lima@email.com',
    phone: '61921098765',
    createdAt: '2024-01-09T08:45:00Z',
  },
  {
    id: '8',
    name: 'Fernanda Souza',
    service: 'Oftalmologia',
    status: 'NEW',
    email: 'fernanda.souza@email.com',
    phone: '71910987654',
    createdAt: '2024-01-08T15:10:00Z',
  },
]

const modalToStatusMap: Record<string, Lead['status']> = {
  new: 'NEW',
  contacted: 'CONTACTED',
  converted: 'CONVERTED',
  lost: 'LOST',
}

const statusChangeModals = ['new', 'contacted', 'converted', 'lost']

export const LeadsDataTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredLeads, setFilteredLeads] = useState(mockLeads)

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage)

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex)

  const modalType = searchParams.get('modal')
  const leadId = searchParams.get('leadId')

  const handleCloseDialog = () => {
    setSearchParams((prev) => {
      prev.delete('modal')
      prev.delete('leadId')
      return prev
    })
  }

  return (
    <div>
      <div className="px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center sm:space-y-0 space-y-6">
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Lista de leads
        </h2>

        <LeadsFilters onFilter={setFilteredLeads} allLeads={mockLeads} />
      </div>

      <div>
        <DataTable
          columns={columns}
          data={paginatedLeads}
        />
        <LeadsPagination
          currentPage={page}
          totalPages={totalPages}
          paginationItemsToDisplay={5}
        />
      </div>

      <LeadStatusChangeDialog
        open={statusChangeModals.includes(modalType || '') && !!leadId}
        onOpenChange={handleCloseDialog}
        leadId={leadId || ''}
        leads={mockLeads}
        newStatus={modalToStatusMap[modalType || ''] || 'NEW'}
      />
    </div>
  )
}
