import { Link } from 'react-router-dom'
import { Logo } from '../logo'
import { SiFacebook, SiX, SiInstagram } from '@icons-pack/react-simple-icons'
import { WhatsApp } from '@ridemountainpig/svgl-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

const links = [
  {
    href: 'https://www.facebook.com/profile.php?id=100088876842523',
    title: 'Facebook',
    icon: <SiFacebook size={24} />,
  },
  { href: '#', title: 'X', icon: <SiX size={24} /> },
  {
    href: 'https://www.instagram.com/docsanconsultoria/',
    title: 'Instagram',
    icon: <SiInstagram size={24} />,
  },
  {
    href: '#',
    title: 'LinkdIn',
    icon: (
      <FontAwesomeIcon
        icon={faLinkedin}
        width={24}
        height={24}
        style={{ display: 'block', verticalAlign: 'middle' }}
      />
    ),
  },
]

export const AppFooter = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <footer className="bg-blue-source text-white font-lato">
        <div className="container mx-auto px-4 xl:px-0 py-20">
          <div className="grid grid-cols-3 gap-12">
            <div>
              <div className="bg-white px-8 py-4 rounded-xl inline-block">
                <Link to={'/'}>
                  <Logo className="w-40" />
                </Link>
              </div>

              <p className="mt-4 font-medium text-lg">
                Conectando expertise regulatória com empresas que precisam de
                soluções de conformidade.
              </p>

              <div className="mt-3 flex gap-8 items-center">
                {links.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{link.title}</span>
                    <span className="text-2xl">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-6">
              <div>
                <strong className="text-lg">Serviços</strong>
                <ul className="mt-2 space-y-1 text-lg">
                  <li>ANVISA Compliance</li>
                  <li>MAPA regulations</li>
                  <li>Health Surveillance</li>
                  <li>Import & Export</li>
                  <li>Corporate Compliance</li>
                  <li>Training & Certification</li>
                </ul>
              </div>
              <div>
                <strong className="text-lg">Companhia</strong>
                <ul className="mt-2 space-y-1 text-lg">
                  <li>Sobre nós</li>
                  <li>Como funciona</li>
                  <li>Para empresas</li>
                  <li>Para profissionais</li>
                  <li>Depoimentos</li>
                </ul>
              </div>
              <div>
                <strong className="text-lg">Contato</strong>
                <ul className="mt-2 space-y-1 text-lg">
                  <li>São Paulo, SP - Brazil</li>
                  <li>
                    <a href="mailto:contact@docsan.com.br">
                      contact@docsan.com.br
                    </a>
                  </li>
                  <li>
                    <a href="tel:+551198765432">+55 (11) 9876-5432</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-between items-end">
            <p>2025 DocSan. All rights reserved</p>

            <a href="#">
              <WhatsApp className="size-[72px]" />
            </a>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-blue-source text-white font-lato">
      <div className="container mx-auto px-4 xl:px-0 py-20">
        <div className="grid grid-cols-1 gap-12">
          <Accordion type="single" collapsible>
            <AccordionItem value="services">
              <AccordionTrigger className="text-lg [&_svg]:text-white">
                Serviços
              </AccordionTrigger>
              <AccordionContent>
                <ul className="mt-2 space-y-1 text-lg">
                  <li>ANVISA Compliance</li>
                  <li>MAPA regulations</li>
                  <li>Health Surveillance</li>
                  <li>Import & Export</li>
                  <li>Corporate Compliance</li>
                  <li>Training & Certification</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="company">
              <AccordionTrigger className="text-lg [&_svg]:text-white">
                Companhia
              </AccordionTrigger>
              <AccordionContent>
                <ul className="mt-2 space-y-1 text-lg">
                  <li>Sobre nós</li>
                  <li>Como funciona</li>
                  <li>Para empresas</li>
                  <li>Para profissionais</li>
                  <li>Depoimentos</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="contact">
              <AccordionTrigger className="text-lg [&_svg]:text-white">
                Contato
              </AccordionTrigger>
              <AccordionContent>
                <ul className="mt-2 space-y-1 text-lg">
                  <li>São Paulo, SP - Brazil</li>
                  <li>
                    <a href="mailto:contact@docsan.com.br">
                      contact@docsan.com.br
                    </a>
                  </li>
                  <li>
                    <a href="tel:+551198765432">+55 (11) 9876-5432</a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div>
            <div className="bg-white px-8 py-4 rounded-xl inline-block">
              <Link to={'/'}>
                <Logo className="w-40" />
              </Link>
            </div>

            <p className="mt-4 font-medium text-lg">
              Conectando expertise regulatória com empresas que precisam de
              soluções de conformidade.
            </p>

            <div className="mt-3 flex gap-8 items-center">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{link.title}</span>
                  <span className="text-2xl">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-20 flex justify-between items-end">
          <p>2025 DocSan. All rights reserved</p>

          <a href="#">
            <WhatsApp className="size-14 lg:size-[72px]" />
          </a>
        </div>
      </div>
    </footer>
  )
}
