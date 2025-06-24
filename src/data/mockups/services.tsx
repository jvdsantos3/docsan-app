const professional = {
  id: '',
  name: 'Juliana Souza',
  avatar: '/images/professionals/juliana-souza.jpg',
  role: 'professional',
  description: 'Especialista em Regulação ANVISA',
  bio: 'Com mais de 10 anos de experiência na área regulatória, atua auxiliando empresas no processo de regularização de produtos junto à ANVISA, incluindo alimentos, cosméticos, saneantes e dispositivos médicos. Sua atuação é marcada pela precisão técnica, atualização constante das normas e foco em garantir que seus clientes cumpram todos os requisitos legais com agilidade e segurança.',
}

const content = (
  <div className="space-y-6">
    <p className="font-lato font-bold text-gray-800">
      Serviço completo de registro de produtos de saúde, medicamentos,
      cosméticos e alimentos junto à ANVISA, incluindo análise documental,
      preparação de dossiê técnico e acompanhamento do processo até a aprovação
      final.
    </p>
    <div>
      <span>Objetivos</span>
      <ul className="list-disc pl-6">
        <li>Obter registro de produto junto à ANVISA</li>
        <li>Garantir conformidade com legislação vigente</li>
        <li>Minimizar tempo de análise e aprovação</li>
      </ul>
    </div>
    <div>
      <span>Entregáveis</span>
      <ul className="list-disc pl-6">
        <li>Dossiê técnico completo</li>
        <li>Formulários de petição preenchidos</li>
        <li>Acompanhamento do processo</li>
        <li>Certificado de registro</li>
      </ul>
    </div>
  </div>
)

export const services = [
  {
    id: 'b12e2515-6bf2-48ce-80cf-02b083e3c33c',
    title: 'Consultoria para Regularização ANVISA',
    description:
      'Te ajudamos a entender e aplicar corretamente as normas da ANVISA para registrar seu produto ou serviço.',
    content,
    imageUrl: '/service-banner-1.svg',
    professional,
  },
  {
    id: 'a8b7ba4e-b2cd-4f68-a3b9-e4665df8d854',
    title: 'Acessoria sanitária',
    description:
      'Orientamos sua empresa para atender às exigências sanitárias vigentes, com suporte completo na obtenção de licenças, regularizações e adequações.',
    content,
    imageUrl: '/service-banner-2.svg',
    professional,
  },
  {
    id: '39f89d6a-0174-42bd-9aa7-8068fd98b4b9',
    title: 'Acessoria ambiental',
    description:
      'Auxiliamos sua empresa no cumprimento das normas ambientais, com licenciamento, regularização e gestão de resíduos conforme exigências legais.',
    content,
    imageUrl: '/service-banner-3.svg',
    professional,
  },
]
