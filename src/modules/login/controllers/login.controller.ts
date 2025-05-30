import { pageList } from '@/configs/routes'
import { type LoginSchema, loginSchema } from '@/configs/schema'
import { COOKIES } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const useLoginController = () => {
	const router = useRouter()
	const defaultValues: LoginSchema = {
		username: '',
		password: '',
	}
	const loginForm = useForm<LoginSchema>({
		defaultValues,
		resolver: zodResolver(loginSchema),
	})

	const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
		if (data.username !== 'admin' || data.password !== 'admin') {
			toast.error('Tên đăng nhập hoặc mật khẩu khônng chính xác')
			return
		}

		await setCookie(COOKIES.JWT, data.username)
		router.push(pageList.home.href)
		return
	}

	return {
		defaultValues,
		loginForm,
		onSubmit,
	}
}

export default useLoginController
