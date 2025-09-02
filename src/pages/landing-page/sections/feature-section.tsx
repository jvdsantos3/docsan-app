import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useServices } from '@/http/use-services'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const serviceBaners = [
  '/service-banner-1.svg',
  '/service-banner-2.svg',
  '/service-banner-3.svg',
]

export const FeatureSection = () => {
  const { data: services } = useServices({ highlight: true, limit: 6 })

  if (!services) return null

  return (
    <section className="mb-18 flex flex-col gap-20">
      <div className="max-w-[39rem] flex flex-col gap-6 self-center text-center">
        <h2 className="text-heading-lg/[120%] text-blue-1000">
          Soluções completas em <strong>consultoria regulatória.</strong>
        </h2>

        <p className="text-heading-sm text-blue-950">
          Conectamos sua empresa aos melhores especialistas para garantir
          conformidade, eficiência e crescimento no setor regulado.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <Carousel>
          <CarouselContent>
            {services?.data.map((service) => {
              const serviceBannerIndex = Math.floor(
                serviceBaners.length * Math.random(),
              )
              const serviceBanner = serviceBaners[serviceBannerIndex]
              const imageSrc = service.image?.base64
                ? `data:image/${service.image.type};base64,${service.image.base64}`
                : serviceBanner

              return (
                <CarouselItem key={service.id} className="basis-1/3">
                  <Card key={service.id}>
                    <img
                      src={imageSrc}
                      alt={service.name}
                      className="w-full h-56 object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="line-clamp-1">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 h-16">
                        {service.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full font-bold text-blue-source border-blue-source"
                        asChild
                      >
                        <Link to={`services/${service.id}`}>Ver detalhes</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Button className={cn('self-center')} asChild>
          <Link to="/services">Ver todos os serviços</Link>
        </Button>
      </div>
    </section>
  )
}
