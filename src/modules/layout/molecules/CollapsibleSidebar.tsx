import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import type { SidebarItem } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
	sidebarItem: SidebarItem
}

const CollapsibleSidebar = ({ sidebarItem }: Props) => {
	const pathname = usePathname()
	const [open, setOpen] = useState<boolean>(false)

	useEffect(() => {
		if (!pathname) return
		setOpen(sidebarItem.items.some((item) => item.href === pathname))
	}, [pathname])

	return (
		<Collapsible
			key={sidebarItem.id}
			open={open}
			onOpenChange={setOpen}
			className="group/collapsible"
		>
			<SidebarMenuItem className="px-2">
				<CollapsibleTrigger asChild>
					<SidebarMenuButton
						isActive={sidebarItem.items.some((item) => item.href === pathname)}
						className="hover:text-primary cursor-pointer active:text-primary rounded-full"
						size="lg"
					>
						{sidebarItem.icon}
						<div className="text-base">{sidebarItem.label}</div>
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent className="transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down duration-300">
					<SidebarMenuSub className="space-y-2">
						{sidebarItem.items.map((item) => {
							return (
								<SidebarMenuSubItem
									className="hover:text-primary cursor-pointer active:text-primary list-none"
									key={item.id}
								>
									<Link
										href={item.href}
										className={cn({
											'text-primary': item.href === pathname,
										})}
									>
										{item.label}
									</Link>
								</SidebarMenuSubItem>
							)
						})}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	)
}

export default CollapsibleSidebar
