import { useAuth } from '@/hooks/use-auth'
import { DocumentTypeVersionsTable } from './document-type-versions-table'
import { useProfile } from '@/http/use-profile'
import { useNavigate, useParams } from 'react-router-dom'
import { useDocumentType } from '@/http/use-document-type'
import { DocumentTypeVersionsHeaderSkeleton } from './document-type-versions-header-skeleton'
import { Button } from '@/components/ui/button'
import { CornerUpLeft } from 'lucide-react'

export const DocumentTypesVersions = () => {
  const { user } = useAuth()
  const { data: profileData } = useProfile({ enabled: !!user })
  const params = useParams()
  const navigate = useNavigate()

  const companyId = profileData?.user.owner?.companyId || ''
  const documentTypeId = params.typeId || ''

  const { data: documentType, isLoading } = useDocumentType(
    documentTypeId,
    companyId,
  )

  return (
    <div className="space-y-6 py-6">
      <Button
          type="button"
          variant="link"
          className="text-blue-source"
          onClick={() => navigate('/documents')}
        >
          <CornerUpLeft /> Voltar
        </Button>
      {isLoading ? <DocumentTypeVersionsHeaderSkeleton /> :
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl">{documentType?.name}</h1>
            <p className="font-medium text-lg mt-4">
              Verifique todas as versões ja cadastradas para esse tipo de documento.
            </p>
          </div>
        </div>
      }
      

      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100">
          <DocumentTypeVersionsTable 
            companyId={companyId}
            documentTypeId={documentTypeId}
          />
        </div>
      </div>
    </div>
  )
}
