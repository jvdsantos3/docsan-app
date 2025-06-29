import { useState } from 'react'
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
import { useAuth } from '@/hooks/use-auth'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ServiceForm } from './service-form'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Services = () => {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()

  // async function fetchServices() {
  //   const response = await axios.get('')
  // }

  return (
    <>
      <div className="space-y-6 py-6">
        <div className="flex justify-between">
          <div>
            <h1 className="font-lato text-3xl">
              Soluções especializadas para sua empresa
            </h1>
            <p className="font-lato font-medium text-lg mt-4">
              Apoiamos o seu negócio na jornada da conformidade e da excelência
              profissional.
            </p>
          </div>

          {isAuthenticated && user?.role === 'professional' && (
            <Button
              className="font-bold text-base"
              size="lg"
              onClick={() => setOpen(true)}
            >
              Adicionar serviço
            </Button>
          )}
        </div>

        <div>
          <Tabs defaultValue="all" className="w-[400px]">
            <TabsList className="bg-blue-100 font-bold h-12 p-2">
              <TabsTrigger
                value="all"
                className="font-lato font-bold data-[state=active]:bg-white text-blue-source data-[state=active]:text-blue-900 data-[state=active]:shadow-none"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="health"
                className="font-lato font-bold data-[state=active]:bg-white text-blue-source data-[state=active]:text-blue-900 data-[state=active]:shadow-none"
              >
                Assessoria sanitária
              </TabsTrigger>
              <TabsTrigger
                value="environmental"
                className="font-lato font-bold data-[state=active]:bg-white text-blue-source data-[state=active]:text-blue-900 data-[state=active]:shadow-none"
              >
                Assessoria ambiental
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
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
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white sm:max-w-md md:max-w-lg lg:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-lato">
              Cadastrar novo serviço
            </DialogTitle>
          </DialogHeader>

          <div>
            <ServiceForm
              onCancel={() => setOpen(false)}
              onSucess={() => setOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
