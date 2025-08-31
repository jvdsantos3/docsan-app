import { Button } from '@/components/ui/button'
import {
  Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Service } from '@/types/service'
import { Link } from 'react-router-dom'

type ServiceWithProfessional = Service & {
  professional?: {
    id: string
    name: string
    avatar: string
    description: string
  }
  image?: {
    name: string
    type: string
    size: number
    base64: string
  }
}

type ServiceCardProps = {
  service: ServiceWithProfessional
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card key={service.id}>
      <img
        src={
          service.image?.base64
            ? `data:image/${service.image.type};base64,${service.image.base64}`
            : '/service-banner-1.svg'
        }
        alt={'Service image'}
        className="w-full h-56 object-cover rounded-t-md"
      />
      <CardHeader>
        <CardTitle className="line-clamp-1">{service.name}</CardTitle>
        <CardDescription className="line-clamp-3 h-16">
          {service.summary}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="font-bold text-blue-source"
            asChild
          >
            <Link to={service.id}>Ver detalhes</Link>
          </Button>
          <Button className="font-bold">Quero contratar</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
