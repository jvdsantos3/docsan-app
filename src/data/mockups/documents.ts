import type { Document } from "@/pages/documents/columns";

export const documents: Document[] = [
  {
    id: '41e5d054-e454-4c85-a4c4-fef57bd9c08a',
    name: 'Alvará de funcionamento',
    type: 'Alvará de funcionamento',
    status: 'up_to_date',
    dueDate: new Date('2026-03-12'),
    receivedDate: new Date('2025-05-15'),
  },
  {
    id: 'cf0cceb9-f2fe-4eb6-92b3-9d9ee6302722',
    name: 'Certificado de Regularidade',
    type: 'Certificado de Regularidade',
    status: 'overdue',
    dueDate: new Date('2024-07-05'),
    receivedDate: new Date('2023-05-10'),
  },
  {
    id: '7a113d1d-7d5f-45c8-b876-c828cff41d77',
    name: 'Licença ambiental',
    type: 'Licença ambiental',
    status: 'up_to_date',
    dueDate: new Date('2025-04-22'),
    receivedDate: new Date('2025-02-05'),
  },
  {
    id: '3f852900-c4c9-4602-b92b-27cc62c82288',
    name: 'Licença ambiental',
    type: 'Licença ambiental',
    status: 'up_to_date',
    dueDate: new Date('2025-09-18'),
    receivedDate: new Date('2024-05-01'),
  },
  {
    id: '58415f7c-58e8-4282-83c1-032ea6667ab2',
    name: 'Licença ambiental',
    type: 'Licença ambiental',
    status: 'due_soon',
    dueDate: new Date('2025-06-06'),
    receivedDate: new Date('2024-04-26'),
  },
]
