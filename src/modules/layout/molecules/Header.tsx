import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar'
import { UserRound } from 'lucide-react'
import LogoutMenuItem from './LogoutMenuItem'

const Header = () => {
	return (
		<div className="flex h-16 items-center justify-end shadow-sm px-5 bg-white">
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger asChild className="border-none cursor-pointer">
						<div className="flex items-center gap-x-2">
							<Avatar className="w-10 h-10">
								<AvatarFallback className="bg-gray-500 text-white">
									<UserRound />
								</AvatarFallback>
							</Avatar>
							<div>
								<p className="font-medium text-base">Hoang Nguyen</p>
								<p className="text-sm text-gray-500">Quản trị viên</p>
							</div>
						</div>
					</MenubarTrigger>
					<MenubarContent>
						<LogoutMenuItem />
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	)
}

export default Header
