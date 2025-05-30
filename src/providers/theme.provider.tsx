'use client'

import { teal } from '@mui/material/colors'
import {
	ThemeProvider as MuiThemeProvider,
	THEME_ID,
	createTheme,
} from '@mui/material/styles'
import type { PropsWithChildren } from 'react'

const ThemeProvider = ({ children }: PropsWithChildren) => {
	const materialTheme = createTheme({
		components: {
			MuiFormHelperText: {
				styleOverrides: {
					root: {
						fontSize: '14px',
						margin: '4px 0 0 0',
					},
				},
			},
		},
		palette: {
			primary: teal,
		},
	})

	return (
		<>
			<MuiThemeProvider theme={{ [THEME_ID]: materialTheme }}>
				{children}
			</MuiThemeProvider>
		</>
	)
}

export default ThemeProvider
