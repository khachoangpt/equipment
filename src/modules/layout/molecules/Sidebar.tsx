import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { pageList } from '@/configs/routes'
import { BriefcaseBusiness, Home, Users, Wrench } from 'lucide-react'
import Link from 'next/link'

const AppSidebar = () => {
	const sidebarItems = [
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
					id: 'danh-muc-trang-bi-dong-bo',
					label: 'Danh mục',
					href: '#',
				},
				{
					id: 'trang-bi-trang-bi-dong-bo',
					label: 'Trang bị',
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
					id: 'danh-muc-trang-bi-lap-ghep',
					label: 'Danh mục',
					href: '#',
				},
				{
					id: 'xay-dung-cau-hinh',
					label: 'Xây dựng cấu hình',
					href: '#',
				},
			],
		},
		{
			id: 'tai-khoan',
			label: 'Tài khoản',
			href: pageList.home.href,
			icon: <Users />,
			items: [],
		},
	]

	return (
		<Sidebar>
			<SidebarHeader className="h-16 bg-teal-500" />
			<SidebarContent className="py-3">
				<SidebarMenu>
					{sidebarItems.map((sidebarItem) => {
						if (sidebarItem.items.length > 0) {
							return (
								<Collapsible
									key={sidebarItem.id}
									defaultOpen={false}
									className="group/collapsible"
								>
									<SidebarMenuItem className="px-2">
										<CollapsibleTrigger asChild>
											<SidebarMenuButton
												className="hover:text-primary active:text-primary rounded-full"
												size="lg"
											>
												{sidebarItem.icon}
												<div className="text-lg">{sidebarItem.label}</div>
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub className="space-y-2">
												{sidebarItem.items.map((item) => {
													return (
														<SidebarMenuSubItem
															className="hover:text-primary active:text-primary"
															key={item.id}
														>
															<Link href={item.href}>{item.label}</Link>
														</SidebarMenuSubItem>
													)
												})}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							)
						}
						return (
							<SidebarMenuItem key={sidebarItem.id} className="px-2">
								<SidebarMenuButton
									className="hover:text-primary active:text-primary rounded-full"
									size="lg"
								>
									{sidebarItem.icon}
									<Link href={pageList.home.href} className="text-lg">
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
