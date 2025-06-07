import { UsersService } from '@/client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar'
import { COOKIES } from '@/constants'
import { UserRound } from 'lucide-react'
import { cookies } from 'next/headers'
import LogoutMenuItem from './LogoutMenuItem'

const Header = async () => {
	const jwt = (await cookies()).get(COOKIES.JWT)?.value
	const jwtPayload = jwt && JSON.parse(atob(jwt.split('.')[1]))

	const { data } = await UsersService.usersControllerFindOne({
		path: { id: jwtPayload?.sub },
		baseURL: process.env.NEXT_PUBLIC_API_URL,
		headers: { Authorization: `Bearer ${jwt}` },
		throwOnError: false,
	})

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
								<p className="font-medium text-base">{data?.fullName}</p>
								<p className="text-sm text-gray-500">
									{data?.role === 'user' ? 'Người dùng' : 'Quản trị viên'}
								</p>
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
