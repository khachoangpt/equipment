import { type AccountSchema, accountSchema } from '@/configs/schema'
import { accounts } from '@/mocks/account.mock'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useAccountDetailController = ({ id }: Props) => {
	const defaultValues: AccountSchema = {
		name: '',
		username: '',
		password: '',
		role: '',
	}
	const accountDetailForm = useForm<AccountSchema>({
		defaultValues,
		resolver: zodResolver(accountSchema),
	})
	useEffect(() => {
		if (id) {
			const accountFound = accounts.find((account) => account.id === id)
			if (accountFound) {
				accountDetailForm.reset({
					name: accountFound.name,
					username: accountFound.username,
					password: undefined,
					role: accountFound.role,
				})
			}
		}
	}, [id])

	const onSubmit: SubmitHandler<AccountSchema> = (data: AccountSchema) => {
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log(data)
	}

	return { accountDetailForm, onSubmit }
}

export default useAccountDetailController
