import { useRef, useState, useEffect } from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'

type TermsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const TermsDialog = ({ open, onOpenChange }: TermsDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="bg-white w-full sm:max-w-md md:max-w-lg lg:max-w-4xl 
                   max-h-[90vh] flex flex-col"
      >
        <AlertDialogHeader>
          <img
            className="w-20 mr-auto mb-4"
            src="/logo-02.svg"
            alt="Docsan logo"
          />
          <AlertDialogTitle className="font-lato text-xl text-gray-950">
            Termos de uso e política de privacidade
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="relative bg-blue-50 p-2 rounded-md flex-1 ">
          <ScrollArea className="flex flex-col max-h-[50vh] px-3 py-4 ">
            <div className="flex flex-col gap-4">
              <h1 className="font-lato font-bold text-lg">
                What is Lorem Ipsum?
              </h1>
              <p className="font-lato font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Why do we use it? It is a long established fact
                that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum
                is that it has a more-or-less normal distribution of letters, as
                opposed to using 'Content here, content here', making it look
                like readable English. Many desktop publishing packages and web
                page editors now use Lorem Ipsum as their default model text,
                and a search for 'lorem ipsum' will uncover many web sites still
                in their infancy. Various versions have evolved over the years,
                sometimes by accident, sometimes on purpose (injected humour and
                the like).
              </p>

              <h1 className="font-lato font-bold text-lg">
                Where does it come from?
              </h1>
              <p className="font-lato font-medium">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32.
              </p>
            </div>
            <ScrollBar />
          </ScrollArea>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Aceitar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
