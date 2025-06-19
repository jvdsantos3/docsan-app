import { Link } from "react-router-dom";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { ProfessionalSignUpForm } from "./professional-sign-up-form";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";

const steps = [
  {
    step: 1,
    id: "personal-data",
    title: "Dados pessoais",
  },
  {
    step: 2,
    id: "professional-data",
    title: "Dados profissionais",
  },
  {
    step: 3,
    id: "address-data",
    title: "Endereço",
  },
];

export const ProfessionalSignUp = () => {
  const { step, isFirstStep, isLastStep, nextStep, previousStep } =
    useMultiStepForm(steps);

  return (
    <div className="min-h-[728px] w-xl md:w-2xl lg:w-5xl bg-white border border-blue-source rounded-2xl m-2 md:m-0 py-5 px-4 md:py-10 md:px-8">
      <div className="flex gap-6">
        <div className="space-y-6 flex-1">
          <div>
            <Link to={"/"}>
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
            <Stepper defaultValue={1} value={step.step} orientation="vertical">
              {steps.map(({ step, title }) => (
                <StepperItem
                  key={step}
                  step={step}
                  className="relative items-start not-last:flex-1"
                >
                  <StepperTrigger className="pb-28" asChild>
                    <div className="flex items-start rounded pb-12 last:pb-0">
                      <StepperIndicator className="bg-gray-50 text-gray-300 data-[state=active]:bg-blue-source data-[state=completed]:bg-blue-source" />
                      <div className="mt-0.5 px-2 text-left">
                        <StepperTitle className="font-lato font-medium">
                          {title}
                        </StepperTitle>
                      </div>
                    </div>
                  </StepperTrigger>
                  {step < steps.length && (
                    <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)] group-data-[state=completed]/step:bg-gray-100" />
                  )}
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </div>

        <div className="flex-1">
          <ProfessionalSignUpForm
            step={step}
            steps={steps}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        </div>
      </div>
    </div>
  );
};
