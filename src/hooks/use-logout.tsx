import { pageList } from '@/configs/routes'
import { COOKIES } from '@/constants'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const useLogout = () => {
	const router = useRouter()

	const logout = async () => {
		await deleteCookie(COOKIES.JWT)
		router.push(pageList.home.href)
		return
	}

	return {
		logout,
	}
}

export default useLogout
