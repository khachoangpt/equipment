'use client'

import { useEffect, useState } from 'react'
import { forwardRef } from 'react'
import TextEditor from './TextEditor'
import type { TextEditorProps, TextEditorRef } from './types'

const TextEditorWrapper = forwardRef<TextEditorRef, TextEditorProps>(
	(props, ref) => {
		const [isMounted, setIsMounted] = useState(false)

		useEffect(() => {
			setIsMounted(true)
		}, [])

		if (!isMounted) {
			return (
				<div className="border border-gray-200 rounded-lg overflow-hidden">
					<div className="min-h-[200px] flex items-center justify-center bg-gray-50">
						<div className="text-gray-500">Loading editor...</div>
					</div>
				</div>
			)
		}

		return <TextEditor ref={ref} {...props} />
	},
)

TextEditorWrapper.displayName = 'TextEditorWrapper'

export default TextEditorWrapper
