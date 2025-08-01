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
import {
	Activity,
	BriefcaseBusiness,
	Home,
	School,
	Settings,
	Users,
	Wrench,
} from 'lucide-react'
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
					id: 'khoi-tao-trang-bi-trang-bi-dong-bo',
					label: 'Trang bị',
					href: pageList.equipmentSet.href,
				},
				{
					id: 'danh-muc-trang-bi-dong-bo',
					label: 'Danh mục',
					href: pageList.equipmentSetCategory.href,
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
					id: 'trang-bi-lap-ghep',
					label: 'Trang bị',
					href: pageList.assembledEquipment.href,
				},
				{
					id: 'danh-muc-trang-bi-lap-ghep',
					label: 'Vật tư/ linh kiện',
					href: pageList.assembledEquipmentComponent.href,
				},
				{
					id: 'cau-hinh-trang-bi-lap-ghep',
					label: 'Cấu hình trang bị',
					href: pageList.assembledEquipmentConfig.href,
				},
				{
					id: 'xay-dung-trang-bi-lap-ghep',
					label: 'Xây dựng trang bị',
					href: pageList.assembledEquipmentBuild.href,
				},
			],
		},
		{
			id: 'hoat-dong',
			label: 'Hoạt động',
			href: pageList.home.href,
			icon: <Activity />,
			items: [
				{
					label: 'Bàn giao trang bị',
					id: 'ban-giao-trang-bi',
					href: pageList.equipmentSetHandover.href,
				},
				{
					label: 'Bảo dưỡng / Sửa chữa',
					id: 'bao-dung-sua-chua',
					href: pageList.equipmentSetMaintenance.href,
				},
				{
					label: 'Thanh lý',
					id: 'thanh-ly',
					href: pageList.equipmentSetLiquidation.href,
				},
			],
		},
		{
			id: 'don-vi',
			label: 'Đơn vị',
			href: pageList.unit.href,
			icon: <School />,
			items: [],
		},
		{
			id: 'tai-khoan',
			label: 'Tài khoản',
			href: pageList.account.href,
			icon: <Users />,
			items: [],
		},
		{
			id: 'cai-dat-chung',
			label: 'Cài đặt chung',
			href: pageList.generalSettings.href,
			icon: <Settings />,
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
									<Link href={sidebarItem.href} className="text-base">
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
