import { authControllerSignInMutation } from '@/client/@tanstack/react-query.gen'
import { useMutation } from '@tanstack/react-query'

const useLogin = () => {
	const { mutate, isPending } = useMutation({
		...authControllerSignInMutation(),
	})

	return {
		login: mutate,
		isPending,
	}
}

export default useLogin
