import { Viewer, type ViewerProps } from '@react-pdf-viewer/core'
import {
  pageNavigationPlugin,
  type RenderCurrentPageLabelProps,
  type RenderGoToPageProps,
} from '@react-pdf-viewer/page-navigation'
import {
  zoomPlugin,
  type RenderCurrentScaleProps,
  type RenderZoomInProps,
  type RenderZoomOutProps,
} from '@react-pdf-viewer/zoom'
import { Button } from './ui/button'
import {
  ChevronLeft,
  ChevronRight,
  ZoomInIcon,
  ZoomOutIcon,
} from 'lucide-react'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/page-navigation/lib/styles/index.css'
import '@react-pdf-viewer/zoom/lib/styles/index.css'

export const ReactPdfViewer = (props: ViewerProps) => {
  const pageNavigationPluginInstance = pageNavigationPlugin()
  const zoomPluginInstance = zoomPlugin()

  const { CurrentPageLabel, GoToNextPage, GoToPreviousPage } =
    pageNavigationPluginInstance
  const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance

  return (
    <div>
      <div className="md:flex md:justify-between md:items-center">
        <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100 rounded-xl">
          <ZoomOut>
            {(props: RenderZoomOutProps) => (
              <Button
                size="icon"
                variant="outline"
                className="size-8"
                onClick={props.onClick}
              >
                <ZoomOutIcon size={12} />
              </Button>
            )}
          </ZoomOut>

          <div className="w-12 flex justify-center items-center">
            <CurrentScale>
              {(props: RenderCurrentScaleProps) => (
                <span className="text-xs text-blue-1000 font-medium">
                  {Math.round(props.scale * 100)}%
                </span>
              )}
            </CurrentScale>
          </div>

          <ZoomIn>
            {(props: RenderZoomInProps) => (
              <Button
                size="icon"
                variant="outline"
                className="size-8"
                onClick={props.onClick}
              >
                <ZoomInIcon size={12} />
              </Button>
            )}
          </ZoomIn>
        </div>

        <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100 rounded-xl">
          <GoToPreviousPage>
            {(props: RenderGoToPageProps) => (
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={props.onClick}
                disabled={props.isDisabled}
              >
                <ChevronLeft />
                Anterior
              </Button>
            )}
          </GoToPreviousPage>

          <div className="min-w-16">
            <CurrentPageLabel>
              {(props: RenderCurrentPageLabelProps) => (
                <span className="text-xs text-blue-1000 font-medium">
                  Página {props.currentPage + 1} de {props.numberOfPages}
                </span>
              )}
            </CurrentPageLabel>
          </div>

          <GoToNextPage>
            {(props: RenderGoToPageProps) => (
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={props.onClick}
                disabled={props.isDisabled}
              >
                <ChevronRight />
                Próximo
              </Button>
            )}
          </GoToNextPage>
        </div>
      </div>

      <div className="overflow-auto h-96 border-2 border-dashed border-gray-200 mt-4 rounded-lg">
        <Viewer
          {...props}
          plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
        />
      </div>
    </div>
  )
}
