import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
// import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { useMemo } from 'react'
import { TiptapEditorHeader } from './tiptap-editor-header'
import TurndownService from 'turndown'
import { marked } from 'marked'

type TiptapEditorProps = {
  content?: string
  onContentChange?: (value: string) => void
}

export const TiptapEditor = ({
  content,
  onContentChange,
}: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyleKit,
    ],
    content: marked.parse(content?.replace(/\\n/g, '\n') ?? ''),
    onUpdate: ({ editor }) => {
      const turndown = new TurndownService({ headingStyle: 'atx' })
      const html = editor.getHTML()
      const md = turndown.turndown(html)
      onContentChange?.(md)
    },
  })

  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="relative shadow-md overflow-hidden border rounded-md">
        <TiptapEditorHeader editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </EditorContext.Provider>
  )
}
