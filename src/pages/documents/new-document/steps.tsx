import type { Step } from '@/contexts/multi-step-form/context'
import type { StepType } from './use-document-multi-step-form'
import { IconSettings } from '@tabler/icons-react'
import { ListCheck, Upload } from 'lucide-react'
import { FieldConfigForm } from './components/field-cofig-form'
import { DocumentUploadForm } from './components/document-upload-form'

export const steps: Step<StepType>[] = [
  {
    id: 'field-config',
    title: 'Configuração dos campos',
    icon: <IconSettings size={24} />,
    content: <FieldConfigForm />,
  },
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
    content: <></>,
  },
]
