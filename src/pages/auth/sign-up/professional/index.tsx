import type { Step } from '@/contexts/multi-step-form/context'
import type { ProfessionalSignUpFormSchema } from './schema'
import type { StepType } from './use-professional-sign-up-multi-step-form'

import { Link } from 'react-router-dom'
import { ProfessionalSignUpForm } from './components/professional-sign-up-form'
import { MultiStepFormProvider } from '@/contexts/multi-step-form/provider'
import { PersonalInfo } from './components/personal-info'
import { AddressInfo } from './components/address-info'
import { ProfessionalInfo } from './components/professional-info'
import { SignUpStepper } from './components/sign-up-stepper'

const steps: Step<StepType>[] = [
  {
    id: 'personal-data',
    title: 'Dados pessoais',
    content: <PersonalInfo />,
  },
  {
    id: 'professional-data',
    title: 'Dados profissionais',
    content: <ProfessionalInfo />,
  },
  {
    id: 'address-data',
    title: 'Endereço',
    content: <AddressInfo />,
  },
]

export const ProfessionalSignUp = () => {
  return (
    <MultiStepFormProvider
      steps={steps}
      initialData={{} as ProfessionalSignUpFormSchema}
    >
      <div className="min-h-[728px] w-xl md:w-2xl lg:w-5xl bg-white border border-blue-source rounded-2xl m-2 md:m-0 py-5 px-4 md:py-10 md:px-8">
        <div className="flex gap-6">
          <div className="space-y-6 flex-1">
            <div>
              <Link to={'/'}>
                <img
                  className="w-[8.6875rem]"
                  src="/logo-02.svg"
                  alt="Docsan logo"
                />
              </Link>
            </div>

            <div className="space-y-2">
              <h1 className="font-lato font-medium text-lg text-gray-950">
                Crie sua conta
              </h1>
              <p className="font-lato text-sm text-gray-600">
                Preencha seus dados para começar a usar a DocSan como
                profissional:
              </p>
            </div>

            <div className="min-h-64">
              <SignUpStepper />
            </div>
          </div>

          <div className="flex-1">
            <ProfessionalSignUpForm />
          </div>
        </div>
      </div>
    </MultiStepFormProvider>
  )
}
