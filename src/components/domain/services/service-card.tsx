import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'

type Service = {
  id: string
  imageUrl: string
  title: string
  description: string
}

type ServiceWithProfessional = Service & {
  professional: {
    id: string
    name: string
    avatar: string
    description: string
  }
}

type ServiceCardProps = {
  service: ServiceWithProfessional
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card key={service.id}>
      <img
        src={service.imageUrl || '/service-banner-1.svg'}
        alt={'Service image'}
        className="w-full h-56 object-cover rounded-t-md"
      />
      <CardHeader>
        <CardTitle className="line-clamp-1">{service.title}</CardTitle>
        <CardDescription className="line-clamp-3 h-16">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Professional avatar */}
        <div className="flex items-center gap-2">
          <Avatar className="border">
            <AvatarImage src={service.professional?.avatar} />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-lato text-gray-950 text-sm">
              {service.professional?.name}
            </p>
            <p className="font-lato text-xs text-muted-foreground">
              {service.professional?.description}
            </p>
          </div>
        </div>
      </CardContent>
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
