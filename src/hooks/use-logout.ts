import { COOKIES } from '@/constants'
import { deleteCookie } from 'cookies-next'

const useLogout = () => {
	const logout = async () => {
		await deleteCookie(COOKIES.JWT)
		window.location.reload()
		return
	}

	return {
		logout,
	}
}

export default useLogout
