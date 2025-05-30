'use client'

import { MenubarItem } from '@/components/ui/menubar'
import useLogout from '@/hooks/use-logout'
import { LogOut } from 'lucide-react'

const LogoutMenuItem = () => {
	const { logout } = useLogout()

	return (
		<MenubarItem
			className="flex items-center gap-x-2 cursor-pointer"
			onClick={logout}
		>
			<LogOut />
			<span>Đăng xuất</span>
		</MenubarItem>
	)
}

export default LogoutMenuItem
