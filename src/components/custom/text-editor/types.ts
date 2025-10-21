import type { Editor } from '@tiptap/react'

export interface TextEditorProps {
	/**
	 * Initial content of the editor (HTML string)
	 */
	content?: string

	/**
	 * Callback function called when content changes
	 * @param content - The new HTML content
	 */
	onChange?: (content: string) => void

	/**
	 * Placeholder text shown when editor is empty
	 */
	placeholder?: string

	/**
	 * Additional CSS classes for the editor container
	 */
	className?: string

	/**
	 * Whether the editor is editable
	 */
	editable?: boolean

	/**
	 * Minimum height of the editor
	 */
	minHeight?: string

	/**
	 * Maximum height of the editor
	 */
	maxHeight?: string

	/**
	 * Whether to show the toolbar
	 */
	showToolbar?: boolean

	/**
	 * Custom toolbar configuration
	 */
	toolbarConfig?: ToolbarConfig
}

export interface ToolbarConfig {
	/**
	 * Show undo/redo buttons
	 */
	undoRedo?: boolean

	/**
	 * Show text formatting buttons (bold, italic, etc.)
	 */
	textFormatting?: boolean

	/**
	 * Show heading buttons
	 */
	headings?: boolean

	/**
	 * Show list buttons
	 */
	lists?: boolean

	/**
	 * Show text alignment buttons
	 */
	textAlign?: boolean

	/**
	 * Show block element buttons (blockquote, code block, etc.)
	 */
	blockElements?: boolean

	/**
	 * Show media buttons (link, image, table)
	 */
	media?: boolean

	/**
	 * Show color buttons
	 */
	colors?: boolean
}

export interface TextEditorRef {
	/**
	 * Get the Tiptap editor instance
	 */
	getEditor: () => Editor | null

	/**
	 * Get current content as HTML
	 */
	getHTML: () => string

	/**
	 * Get current content as JSON
	 */
	getJSON: () => any

	/**
	 * Set content from HTML
	 */
	setHTML: (html: string) => void

	/**
	 * Set content from JSON
	 */
	setJSON: (json: any) => void

	/**
	 * Clear all content
	 */
	clear: () => void

	/**
	 * Focus the editor
	 */
	focus: () => void

	/**
	 * Blur the editor
	 */
	blur: () => void
}

export interface LinkModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: (url: string) => void
	initialUrl?: string
}

export interface ImageUploadProps {
	onUpload: (file: File) => Promise<string>
	accept?: string
	maxSize?: number
}

export interface TableConfig {
	rows: number
	cols: number
	withHeaderRow?: boolean
}

export type TextAlign = 'left' | 'center' | 'right' | 'justify'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface ColorConfig {
	text: string[]
	background: string[]
	highlight: string[]
}

export interface FontConfig {
	families: string[]
	sizes: string[]
}
