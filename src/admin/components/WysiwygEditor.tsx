// admin/components/WysiwygEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import {
    Bold, Italic, List, ListOrdered, Link2, Image as ImageIcon,
    Heading2, AlignLeft, AlignCenter, AlignRight, Heading1, Heading3,
    Undo, Redo
} from 'lucide-react'

interface WysiwygEditorProps {
    value: string
    onChange: (html: string) => void
    placeholder?: string
    minHeight?: string
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-white/5 rounded-t-xl">
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="p-1.5 rounded hover:bg-white/10 transition-colors disabled:opacity-30 text-slate-400"
            >
                <Undo size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="p-1.5 rounded hover:bg-white/10 transition-colors disabled:opacity-30 text-slate-400"
            >
                <Redo size={16} />
            </button>

            <div className="w-px h-6 bg-white/10" />

            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive('bold') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <Bold size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive('italic') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <Italic size={16} />
            </button>

            <div className="w-px h-6 bg-white/10" />

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <Heading1 size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <Heading2 size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <Heading3 size={16} />
            </button>

            <div className="w-px h-6 bg-white/10" />

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive('bulletList') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <List size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive('orderedList') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <ListOrdered size={16} />
            </button>

            <div className="w-px h-6 bg-white/10" />

            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <AlignLeft size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <AlignCenter size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <AlignRight size={16} />
            </button>

            <div className="w-px h-6 bg-white/10" />

            <button
                onClick={() => {
                    const url = window.prompt('URL del enlace:')
                    if (url) editor.chain().focus().setLink({ href: url }).run()
                }}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${editor.isActive('link') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                    }`}
            >
                <Link2 size={16} />
            </button>
            <button
                onClick={() => {
                    const url = window.prompt('URL de la imagen:')
                    if (url) editor.chain().focus().setImage({ src: url }).run()
                }}
                className="p-1.5 rounded hover:bg-white/10 transition-colors text-slate-400"
            >
                <ImageIcon size={16} />
            </button>
        </div>
    )
}

export default function WysiwygEditor({ value, onChange, minHeight = '150px' }: WysiwygEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] }
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-indigo-400 hover:underline' }
            }),
            Image.configure({
                HTMLAttributes: { class: 'max-w-full rounded-lg my-2' }
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            })
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: `prose prose-invert max-w-none p-4 text-slate-200 focus:outline-none min-h-[${minHeight}]`
            }
        }
    })

    return (
        <div className="glass rounded-xl overflow-hidden border border-white/10">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}