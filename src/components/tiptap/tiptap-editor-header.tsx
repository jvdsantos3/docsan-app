import { Editor, useEditorState } from '@tiptap/react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Italic,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export const TiptapEditorHeader = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }) ?? false,
        canAlignLeft:
          ctx.editor.can().chain().setTextAlign('left').run() ?? false,
        isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }) ?? false,
        canAlignCenter:
          ctx.editor.can().chain().setTextAlign('center').run() ?? false,
        isAlignRight: ctx.editor.isActive({ textAlign: 'right' }) ?? false,
        canAlignRight:
          ctx.editor.can().chain().setTextAlign('right').run() ?? false,
        isAlignJustify: ctx.editor.isActive({ textAlign: 'justify' }) ?? false,
        canAlignJustify:
          ctx.editor.can().chain().setTextAlign('justify').run() ?? false,
      }
    },
  })

  return (
    <div
      data-slot="tiptap-toolbar"
      className="sticky top-0 px-2 z-10 flex justify-center items-center gap-2 h-10 bg-white border-b border-neutral-200"
    >
      <div className="flex-1" />

      <div className="flex gap-0.5">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <Undo2 className="size-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <Redo2 className="size-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-4/5!" />

      <div className="flex gap-0.5">
        {/* Heading select */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              T <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuRadioGroup onValueChange={() => {}}>
              <DropdownMenuRadioItem value="h1">
                <span className="text-muted-foreground text-xs">
                  T<sub>1</sub>
                </span>{' '}
                Título 1
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="h2">
                <span className="text-muted-foreground text-xs">
                  T<sub>2</sub>
                </span>{' '}
                Título 2
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="h3">
                <span className="text-muted-foreground text-xs">
                  T<sub>3</sub>
                </span>{' '}
                Título 3
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="h4">
                <span className="text-muted-foreground text-xs">
                  T<sub>4</sub>
                </span>{' '}
                Título 4
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="h5">
                <span className="text-muted-foreground text-xs">
                  T<sub>5</sub>
                </span>{' '}
                Título 5
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="h6">
                <span className="text-muted-foreground text-xs">
                  T<sub>6</sub>
                </span>{' '}
                Título 6
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator orientation="vertical" className="h-4/5!" />

      <ToggleGroup type="multiple">
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          className="data-[state=on]:bg-blue-100/50"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          className="data-[state=on]:bg-blue-100/50"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          aria-label="Toggle underline"
          className="data-[state=on]:bg-blue-100/50"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
          className="data-[state=on]:bg-blue-100/50"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
        >
          <Strikethrough className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Separator orientation="vertical" className="h-4/5!" />

      <div className="flex gap-0.5">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Align left"
          className={cn(editorState.isAlignLeft && 'bg-blue-100/50')}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          disabled={!editorState.canAlignLeft}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Align center"
          className={cn(editorState.isAlignCenter && 'bg-blue-100/50')}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          disabled={!editorState.canAlignCenter}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Align right"
          className={cn(editorState.isAlignRight && 'bg-blue-100/50')}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          disabled={!editorState.canAlignRight}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Align justify"
          className={cn(editorState.isAlignJustify && 'bg-blue-100/50')}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          disabled={!editorState.canAlignJustify}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1" />
    </div>
  )
}
