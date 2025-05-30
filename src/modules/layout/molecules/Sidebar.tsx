'use client'

import {} from '@/components/ui/collapsible'
import {
	Sidebar,
	SidebarContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { pageList } from '@/configs/routes'
import type { SidebarItem } from '@/types'
import { BriefcaseBusiness, Home, Users, Wrench } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CollapsibleSidebar from './CollapsibleSidebar'

const AppSidebar = () => {
	const sidebarItems: SidebarItem[] = [
		{
			id: 'home',
			label: 'Trang chủ',
			href: pageList.home.href,
			icon: <Home />,
			items: [],
		},
		{
			id: 'trang-bi-dong-bo',
			label: 'Trang bị đồng bộ',
			href: pageList.home.href,
			icon: <BriefcaseBusiness />,
			items: [
				{
					id: 'trang-bi-trang-bi-dong-bo',
					label: 'Trang bị',
					href: pageList.equipmentSet.href,
				},
				{
					id: 'danh-muc-trang-bi-dong-bo',
					label: 'Danh mục',
					href: '#',
				},
				{
					label: 'Bàn giao trang bị',
					id: 'ban-giao-trang-bi',
					href: '#',
				},
				{
					label: 'Bảo dưỡng / Sửa chữa',
					id: 'bao-dung-sua-chua',
					href: '#',
				},
				{
					label: 'Thanh lý',
					id: 'thanh-ly',
					href: '#',
				},
				{
					label: 'Kiểm kê',
					id: 'kiem-ke',
					href: '#',
				},
				{
					label: 'Thống kê kho',
					id: 'thong-ke-kho',
					href: '#',
				},
			],
		},
		{
			id: 'trang-bi-lap-ghep',
			label: 'Trang bị lắp ghép',
			href: pageList.home.href,
			icon: <Wrench />,
			items: [
				{
					id: 'xay-dung-cau-hinh',
					label: 'Xây dựng cấu hình',
					href: pageList.assembledEquipment.href,
				},
				{
					id: 'danh-muc-trang-bi-lap-ghep',
					label: 'Danh mục',
					href: '#',
				},
			],
		},
		{
			id: 'tai-khoan',
			label: 'Tài khoản',
			href: pageList.account.href,
			icon: <Users />,
			items: [],
		},
	]
	const pathname = usePathname()

	return (
		<Sidebar>
			<SidebarContent className="py-3 bg-white">
				<SidebarMenu>
					{sidebarItems.map((sidebarItem) => {
						if (sidebarItem.items.length > 0) {
							return (
								<CollapsibleSidebar
									key={sidebarItem.id}
									sidebarItem={sidebarItem}
								/>
							)
						}
						return (
							<SidebarMenuItem key={sidebarItem.id} className="px-2">
								<SidebarMenuButton
									isActive={sidebarItem.href === pathname}
									className="hover:text-primary data-[active=true]:text-primary active:text-primary rounded-full"
									size="lg"
								>
									{sidebarItem.icon}
									<Link href={sidebarItem.href} className="text-lg">
										{sidebarItem.label}
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	)
}

export default AppSidebar
