import { pageList } from '@/configs/routes'
import { type LoginSchema, loginSchema } from '@/configs/schema'
import { COOKIES } from '@/constants'
import useLogin from '@/hooks/auth/use-login'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const useLoginController = () => {
	const { login } = useLogin()
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
		login(
			{ body: data },
			{
				onSuccess: async (result: any) => {
					await setCookie(COOKIES.JWT, result.access_token)
					router.push(pageList.home.href)
				},
				onError: (error) => {
					toast.error(
						<div
							dangerouslySetInnerHTML={{
								__html: (error.response?.data as any)?.message,
							}}
						/>,
					)
				},
			},
		)
	}

	return {
		defaultValues,
		loginForm,
		onSubmit,
	}
}

export default useLoginController
