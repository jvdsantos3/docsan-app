import { Link } from 'react-router-dom'
import { EnterpriseSignUpForm } from './enterprise-sign-up-form'
import { MultiStepFormProvider } from '@/contexts/multi-step-form/provider'
import type { Step } from '@/contexts/multi-step-form/context'
import { BusinessInfo } from './business-info'
import { BusinessAddressInfo } from './bussiness-address-info'
import { ResponsibleInfo } from './responsible-info'
import type { EnterpriseSignUpSchema } from './schema'
import type { StepType } from './useEnterpriseSignUpMultiStepForm'
import { SignUpStepper } from './sign-up-stepper'

const steps: Step<StepType>[] = [
  {
    id: 'business-data',
    title: 'Dados da empresa',
    content: <BusinessInfo />,
  },
  {
    id: 'bussiness-address-data',
    title: 'Endereço comercial',
    content: <BusinessAddressInfo />,
  },
  {
    id: 'responsible-data',
    title: 'Responsável',
    content: <ResponsibleInfo />,
  },
]

export const EnterpriseSignUp = () => {
  return (
    <MultiStepFormProvider
      initialData={{} as EnterpriseSignUpSchema}
      steps={steps}
    >
      <div className="min-h-[728px] w-xl md:w-2xl lg:w-5xl bg-white border border-blue-source rounded-2xl m-2 py-5 px-4 md:py-10 md:px-8">
        <div className="flex flex-col md:flex-row gap-6">
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
                Preencha seus dados para começar a usar a DocSan como empresa:
              </p>
            </div>

            <div className="min-h-64">
              <SignUpStepper />
            </div>
          </div>

          <div className="flex-1">
            <EnterpriseSignUpForm />
          </div>
        </div>
      </div>
    </MultiStepFormProvider>
  )
}
