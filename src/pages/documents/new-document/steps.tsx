import type { Step } from '@/contexts/multi-step-form/context'
import type { StepType } from './use-document-multi-step-form'
import { ListCheck, Upload } from 'lucide-react'
import { DocumentUploadForm } from './components/document-upload-form'
import { DocumentDataExtractionForm } from './components/document-data-extraction-form'

export const steps: Step<StepType>[] = [
  {
    id: 'upload-documents',
    title: 'Upload de documentos',
    icon: <Upload size={24} />,
    content: <DocumentUploadForm />,
  },
  {
    id: 'data-extraction',
    title: 'Extração de dados',
    icon: <ListCheck size={24} />,
    content: <DocumentDataExtractionForm />,
  },
]
