import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useService } from '@/http/use-service'
import { CornerUpLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { ServiceDetailsSkeleton } from './service-details-skeleton'
import Markdown from 'react-markdown'

export const ServiceDetails = () => {
  const navigate = useNavigate()
  const { serviceId } = useParams<{ serviceId: string }>()
  const { data: service, isLoading } = useService(serviceId || '')

  return (
    <div className="space-y-6 py-6">
      <Button
        variant="link"
        className="text-blue-source"
        onClick={() => navigate(-1)}
      >
        <CornerUpLeft />
        Voltar
      </Button>

      {isLoading ? (
        <ServiceDetailsSkeleton />
      ) : (
        <div className="flex gap-12">
          <div className="space-y-4 flex-1">
            <h1 className="font-lato font-bold text-[21px] text-blue-1000">
              {service?.name}
            </h1>
            <p>{service?.summary}</p>
            <div className="mt-12">
              <Markdown>{service?.description}</Markdown>
            </div>
          </div>

          <aside className="w-full max-w-md">
            <Card className="sticky top-20">
              <img
                src={
                  service?.image?.base64
                    ? `data:image/png;base64,${service?.image?.base64}`
                    : '/service-banner-1.svg'
                }
                alt={'Service image'}
                className="w-full h-56 object-cover"
              />
              <CardContent>
                <Button className="w-full font-bold">Quero contratar</Button>
                <p className="font-lato text-center text-sm text-gray-600 mt-3">
                  Ao solicitar, você receberá uma proposta detalhada e poderá
                  tirar suas dúvidas antes de contratar.
                </p>

                {/* <div className="mt-4">
                <p className="font-lato font-medium text-lg text-blue-1000">
                  Conheça o profissional
                </p>

                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="border">
                      <AvatarImage src={service?.professional.avatar} />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <p className="font-lato font-medium text-gray-900">
                      {service?.professional.name}
                    </p>
                  </div>

                  <p className="font-lato text-gray-800">
                    {service?.professional.bio}
                  </p>
                </div>
              </div> */}
              </CardContent>
            </Card>
          </aside>
        </div>
      )}
    </div>
  )
}
