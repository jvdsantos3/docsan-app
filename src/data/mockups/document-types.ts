import type { DocumentType } from "@/pages/document-types/columns";

export const documentTypes: DocumentType[] = [
  {
    id: '95f20730-44b8-4985-84d1-ef9a4455c3eb',
    name: 'Contrato de Prestação de Serviços',
    isActive: false,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    id: '7d8e9e41-2991-4931-a35d-a204a08b1954',
    name: 'Certificado de Regularidade',
    isActive: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    id: 'f7d60ef6-ebf4-488b-b3d6-4a394f3ed3ce',
    name: 'Alvará de Funcionamento',
    isActive: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  }
]