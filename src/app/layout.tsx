import { cn } from '@/utils'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { RobotoFont } from '@/configs/fonts'
import QueryProvider from '@/providers/query.provider'
import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { ReactNode } from 'react'

type RootLayoutProps = Readonly<{ children: ReactNode }>

export const metadata: Metadata = {
	title: 'Quản lý trang bị',
	description: 'Quản lý trang bị',
}

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang="vi">
			<body className={cn('overflow-hidden antialiased', RobotoFont.className)}>
				<QueryProvider>
					<NuqsAdapter>{children}</NuqsAdapter>
				</QueryProvider>

				<Toaster richColors position="top-center" />
			</body>
		</html>
	)
}

export default RootLayout
