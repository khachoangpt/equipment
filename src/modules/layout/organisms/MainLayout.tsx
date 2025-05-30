import { SidebarProvider } from '@/components/ui/sidebar'
import type { ReactNode } from 'react'
import Header from '../molecules/Header'
import AppSidebar from '../molecules/Sidebar'

type Props = {
	children: ReactNode
}

const MainLayout = ({ children }: Props) => {
	return (
		<div className="flex h-screen overflow-hidden bg-gray-100">
			<SidebarProvider>
				<AppSidebar />
				<div className="w-full h-screen flex flex-col">
					<Header />
					<div className="p-5 flex-1 overflow-hidden">{children}</div>
				</div>
			</SidebarProvider>
		</div>
	)
}

export default MainLayout
