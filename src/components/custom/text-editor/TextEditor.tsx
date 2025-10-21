'use client'

import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Strike from '@tiptap/extension-strike'
import { Table } from '@tiptap/extension-table'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
	AlignCenter as AlignCenterIcon,
	AlignJustify as AlignJustifyIcon,
	AlignLeft as AlignLeftIcon,
	AlignRight as AlignRightIcon,
	Bold as BoldIcon,
	Code2 as CodeBlockIcon,
	Code as CodeIcon,
	Palette as ColorIcon,
	Heading1 as H1Icon,
	Heading2 as H2Icon,
	Heading3 as H3Icon,
	Heading4 as H4Icon,
	Heading5 as H5Icon,
	Heading6 as H6Icon,
	Highlighter as HighlightIcon,
	Minus as HorizontalRuleIcon,
	Italic as ItalicIcon,
	Link as LinkIcon,
	List as ListIcon,
	ListOrdered as OrderedListIcon,
	Quote as QuoteIcon,
	Redo as RedoIcon,
	Strikethrough as StrikeIcon,
	Table as TableIcon,
	Underline as UnderlineIcon,
	Undo as UndoIcon,
} from 'lucide-react'
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react'
import './TextEditor.css'
import type { TextEditorProps, TextEditorRef } from './types'

const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(
	(
		{
			content = '',
			onChange,
			placeholder = 'Start typing...',
			className,
			editable = true,
			minHeight = '200px',
			maxHeight,
			showToolbar = true,
		},
		ref,
	) => {
		const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
		const [linkUrl, setLinkUrl] = useState('')
		const [isEditorReady, setIsEditorReady] = useState(false)
		const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
		const [isMounted, setIsMounted] = useState(false)

		// Color palettes
		const textColors = [
			'#000000',
			'#333333',
			'#666666',
			'#999999',
			'#CCCCCC',
			'#FF0000',
			'#FF6600',
			'#FFCC00',
			'#00FF00',
			'#00CCFF',
			'#0066FF',
			'#6600FF',
			'#FF00CC',
			'#8B4513',
			'#2F4F4F',
		]

		const editor = useEditor({
			extensions: [
				StarterKit,
				Bold,
				Italic,
				Strike,
				Code,
				BulletList,
				OrderedList,
				ListItem,
				Blockquote,
				CodeBlock,
				HorizontalRule,
				Underline,
				TextStyle,
				Color,
				Highlight,
				FontFamily,
				TextAlign.configure({
					types: ['heading', 'paragraph'],
				}),
				Link.configure({
					openOnClick: false,
					HTMLAttributes: {
						class: 'text-blue-500 underline cursor-pointer',
					},
				}),
				Table.configure({
					resizable: true,
				}),
				TableRow,
				TableHeader,
				TableCell,
			],
			content,
			editable,
			onUpdate: ({ editor }) => {
				onChange?.(editor.getHTML())
			},
			onCreate: () => {
				setIsEditorReady(true)
			},
			editorProps: {
				attributes: {
					class: cn(
						'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
						className,
					),
				},
			},
			// Fix SSR hydration issues
			immediatelyRender: false,
		})

		const setTextColor = useCallback(
			(color: string) => {
				editor?.chain().focus().setColor(color).run()
				setIsColorPickerOpen(false)
			},
			[editor],
		)

		const toggleHighlight = useCallback(() => {
			if (editor?.isActive('highlight')) {
				editor?.chain().focus().unsetHighlight().run()
			} else {
				editor?.chain().focus().setHighlight({ color: '#fbbf24' }).run()
			}
		}, [editor])

		// Sync content when prop changes
		useEffect(() => {
			if (editor && content !== editor.getHTML()) {
				editor.commands.setContent(content)
			}
		}, [content, editor])

		// Ensure editor is properly initialized with content
		useEffect(() => {
			if (editor && isEditorReady && content) {
				const currentContent = editor.getHTML()
				if (currentContent !== content && currentContent !== '<p></p>') {
					editor.commands.setContent(content)
				}
			}
		}, [editor, isEditorReady, content])

		// Handle client-side mounting
		useEffect(() => {
			setIsMounted(true)
		}, [])

		const setLink = useCallback(() => {
			if (linkUrl === '') {
				editor?.chain().focus().extendMarkRange('link').unsetLink().run()
				return
			}

			editor
				?.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: linkUrl })
				.run()
			setIsLinkModalOpen(false)
			setLinkUrl('')
		}, [editor, linkUrl])

		const addTable = useCallback(() => {
			editor
				?.chain()
				.focus()
				.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
				.run()
		}, [editor])

		// Expose methods through ref
		useImperativeHandle(
			ref,
			() => ({
				getEditor: () => editor,
				getHTML: () => editor?.getHTML() || '',
				getJSON: () => editor?.getJSON() || null,
				setHTML: (html: string) => editor?.commands.setContent(html),
				setJSON: (json: any) => editor?.commands.setContent(json),
				clear: () => editor?.commands.clearContent(),
				focus: () => editor?.commands.focus(),
				blur: () => editor?.commands.blur(),
			}),
			[editor],
		)

		// Don't render on server side
		if (!isMounted) {
			return (
				<div className="border border-gray-200 rounded-lg overflow-hidden">
					<div className="min-h-[200px] flex items-center justify-center bg-gray-50">
						<div className="text-gray-500">Loading editor...</div>
					</div>
				</div>
			)
		}

		if (!editor) {
			return null
		}

		if (!isEditorReady) {
			return (
				<div className="border border-gray-200 rounded-lg overflow-hidden">
					<div className="min-h-[200px] flex items-center justify-center bg-gray-50">
						<div className="text-gray-500">Loading editor...</div>
					</div>
				</div>
			)
		}

		return (
			<div className="border border-gray-200 rounded-lg overflow-hidden">
				{/* Toolbar */}
				{showToolbar && (
					<div className="border-b border-gray-200 p-2 bg-gray-50 flex flex-wrap gap-1">
						{/* Undo/Redo */}
						<div className="flex gap-1">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => editor.chain().focus().undo().run()}
								disabled={!editor.can().chain().focus().undo().run()}
							>
								<UndoIcon className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => editor.chain().focus().redo().run()}
								disabled={!editor.can().chain().focus().redo().run()}
							>
								<RedoIcon className="h-4 w-4" />
							</Button>
						</div>

						<Separator orientation="vertical" className="h-8" />

						{/* Text Formatting */}
						<div className="flex gap-1">
							<Button
								variant={editor.isActive('bold') ? 'default' : 'ghost'}
								size="sm"
								onClick={() => editor.chain().focus().toggleBold().run()}
							>
								<BoldIcon className="h-4 w-4" />
							</Button>
							<Button
								variant={editor.isActive('italic') ? 'default' : 'ghost'}
								size="sm"
								onClick={() => editor.chain().focus().toggleItalic().run()}
							>
								<ItalicIcon className="h-4 w-4" />
							</Button>
							<Button
								variant={editor.isActive('underline') ? 'default' : 'ghost'}
								size="sm"
								onClick={() => editor.chain().focus().toggleUnderline().run()}
							>
								<UnderlineIcon className="h-4 w-4" />
							</Button>
							<Button
								variant={editor.isActive('strike') ? 'default' : 'ghost'}
								size="sm"
								onClick={() => editor.chain().focus().toggleStrike().run()}
							>
								<StrikeIcon className="h-4 w-4" />
							</Button>
							<Button
								variant={editor.isActive('code') ? 'default' : 'ghost'}
								size="sm"
								onClick={() => editor.chain().focus().toggleCode().run()}
							>
								<CodeIcon className="h-4 w-4" />
							</Button>
						</div>

						<Separator orientation="vertical" className="h-8" />

						{/* Headings */}
						<div className="flex gap-1">
							<Button
								variant={
									editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'
								}
								size="sm"
								onClick={() =>
									editor.chain().focus().toggleHeading({ level: 1 }).run()
								}
							>
								<H1Icon className="h-4 w-4" />
							</Button>
							<Button
								variant={
									editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'
								}
								size="sm"
								onClick={() =>
									editor.chain().focus().toggleHeading({ level: 2 }).run()
								}
							>
								<H2Icon className="h-4 w-4" />
							</Button>
							<Button
								variant={
									editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'
								}
								size="sm"
								onClick={() =>
									editor.chain().focus().toggleHeading({ level: 3 }).run()
								}
							>
								<H3Icon className="h-4 w-4" />
							</Button>
							<Button
								variant={
									editor.isActive('heading', { level: 4 }) ? 'default' : 'ghost'
								}
								size="sm"
								onClick={() =>
									editor.chain().focus().toggleHeading({ level: 4 }).run()
								}
							>
								<H4Icon className="h-4 w-4" />
							</Button>
							<Button
								variant={
									editor.isActive('heading', { level: 5 }) ? 'default' : 'ghost'
								}
								size="sm"
								onClick={() =>
									editor.chain().focus().toggleHeading({ level: 5 }).run()
								}
							>
								<H5Icon className="h-4 w-4" />
							</Button>
							<Button
								variant={
									editor.isActive('heading', { level: 6 }) ? 'default' : 'ghost'
								}
								size="sm"
								onClick={() =>
									editor.chain().focus().toggleHeading({ level: 6 }).run()
								}
							>
								<H6Icon className="h-4 w-4" />
							</Button>
						</div>

						<Separator orientation="vertical" className="h-8" />

						{/* Lists */}
						<div className="flex gap-1">
							<Button
								variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
								size="sm"
								onClick={() => editor.chain().focus().toggleBulletList().run()}
							>
								<ListIcon className="h-4 w-4" />
							</Button>
							<Button
								variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
								size="sm"
								onClick={() => editor.chain().focus().toggleOrderedList().run()}
							>
								<OrderedListIcon className="h-4 w-4" />
							</Button>
						</div>

						<Separator orientation="vertical" className="h-8" />

						{/* Text Alignment */}
						<div className="flex gap-1">
							<Button
								variant={
									editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'
								}
								size="sm"
								onClick={() =>
									editor.chain().focus().setTextAlign('left').run()
								}
							>
								<AlignLeftIcon className="h-4 w-4" />
							</Button>
							<Button
								variant={
									editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'
								}
								size="sm"
								onClick={() =>
									editor.chain().focus().setTextAlign('center').run()
								}
							>
								<AlignCenterIcon className="h-4 w-4" />
							</Button>
							<Button
								variant={
									editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'
								}
								size="sm"
								onClick={() =>
									editor.chain().focus().setTextAlign('right').run()
								}
							>
								<AlignRightIcon className="h-4 w-4" />
							</Button>
							<Button
								variant={
									editor.isActive({ textAlign: 'justify' })
										? 'default'
										: 'ghost'
								}
								size="sm"
								onClick={() =>
									editor.chain().focus().setTextAlign('justify').run()
								}
							>
								<AlignJustifyIcon className="h-4 w-4" />
							</Button>
						</div>

						<Separator orientation="vertical" className="h-8" />

						{/* Block Elements */}
						<div className="flex gap-1">
							<Button
								variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
								size="sm"
								onClick={() => editor.chain().focus().toggleBlockquote().run()}
							>
								<QuoteIcon className="h-4 w-4" />
							</Button>
							<Button
								variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
								size="sm"
								onClick={() => editor.chain().focus().toggleCodeBlock().run()}
							>
								<CodeBlockIcon className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => editor.chain().focus().setHorizontalRule().run()}
							>
								<HorizontalRuleIcon className="h-4 w-4" />
							</Button>
						</div>

						<Separator orientation="vertical" className="h-8" />

						{/* Media & Links */}
						<div className="flex gap-1">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsLinkModalOpen(true)}
							>
								<LinkIcon className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="sm" onClick={addTable}>
								<TableIcon className="h-4 w-4" />
							</Button>
						</div>

						<Separator orientation="vertical" className="h-8" />

						{/* Colors */}
						<div className="flex gap-1">
							<Popover
								open={isColorPickerOpen}
								onOpenChange={setIsColorPickerOpen}
							>
								<PopoverTrigger asChild>
									<Button variant="ghost" size="sm">
										<ColorIcon className="h-4 w-4" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-64 p-3">
									<div className="space-y-2">
										<h4 className="text-sm font-medium">Text Color</h4>
										<div className="grid grid-cols-5 gap-2">
											{textColors.map((color) => (
												<button
													key={color}
													type="button"
													className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
													style={{ backgroundColor: color }}
													onClick={() => setTextColor(color)}
													title={color}
												/>
											))}
										</div>
									</div>
								</PopoverContent>
							</Popover>

							<Button
								variant={editor.isActive('highlight') ? 'default' : 'ghost'}
								size="sm"
								onClick={toggleHighlight}
							>
								<HighlightIcon className="h-4 w-4" />
							</Button>
						</div>
					</div>
				)}

				{/* Editor Content */}
				<div
					className="overflow-auto"
					style={{
						minHeight,
						maxHeight: maxHeight || 'none',
					}}
				>
					<EditorContent editor={editor} placeholder={placeholder} />
				</div>

				{/* Link Modal */}
				{isLinkModalOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white p-6 rounded-lg shadow-lg w-96">
							<h3 className="text-lg font-semibold mb-4">Add Link</h3>
							<input
								type="url"
								placeholder="Enter URL"
								value={linkUrl}
								onChange={(e) => setLinkUrl(e.target.value)}
								className="w-full p-2 border border-gray-300 rounded mb-4"
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										setLink()
									}
									if (e.key === 'Escape') {
										setIsLinkModalOpen(false)
										setLinkUrl('')
									}
								}}
							/>
							<div className="flex gap-2 justify-end">
								<Button
									variant="outline"
									onClick={() => {
										setIsLinkModalOpen(false)
										setLinkUrl('')
									}}
								>
									Cancel
								</Button>
								<Button onClick={setLink}>Add Link</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	},
)

TextEditor.displayName = 'TextEditor'

export default TextEditor
