import { services } from '@/data/mockups/services'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Services = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-lato text-3xl">
          Soluções especializadas para sua empresa
        </h1>
        <p className="font-lato font-medium text-lg mt-4">
          Apoiamos o seu negócio na jornada da conformidade e da excelência
          profissional.
        </p>
      </div>

      <div>filtros</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 10 }).map(() => {
          return services.map((service) => (
            <Card key={service.id}>
              <img
                src={service.imageUrl}
                alt={service.title}
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
                      {service.professional?.role}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-3">
                  <Button variant="outline" className="font-bold" asChild>
                    <Link to={service.id}>Ver detalhes</Link>
                  </Button>
                  <Button className="font-bold">Quero contratar</Button>
                </div>
              </CardFooter>
            </Card>
          ))
        })}
      </div>
    </div>
  )
}
