import {
	usersControllerCreateMutation,
	usersControllerFindAllQueryKey,
	usersControllerFindOneOptions,
	usersControllerFindOneQueryKey,
	usersControllerUpdateMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import { type AccountSchema, accountSchema } from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
	id?: string
}

const useAccountDetailController = ({ id }: Props) => {
	const router = useRouter()
	const defaultValues: AccountSchema = {
		mode: id ? 'edit' : 'create',
		name: '',
		username: '',
		password: '',
		role: '',
	}
	const accountDetailForm = useForm<AccountSchema>({
		defaultValues,
		resolver: zodResolver(accountSchema),
	})
	const { mutate: create } = useMutation({ ...usersControllerCreateMutation() })
	const { mutate: update } = useMutation({ ...usersControllerUpdateMutation() })
	const { data: account, isPending } = useQuery({
		...usersControllerFindOneOptions({ path: { id: id ?? '' } }),
		enabled: !!id,
	})

	useEffect(() => {
		if (id) {
			if (account) {
				accountDetailForm.reset({
					mode: 'edit',
					name: account.fullName,
					role: account.role,
				})
			}
		}
	}, [id, isPending])

	const onSubmit: SubmitHandler<AccountSchema> = (data: AccountSchema) => {
		if (!id) {
			create(
				{
					body: {
						password: data.password ?? '',
						role: data.role as 'admin' | 'user',
						username: data.username ?? '',
						fullName: data.name,
					},
				},
				{
					onError: (error) => {
						toast.error(
							<div
								dangerouslySetInnerHTML={{
									__html:
										(error.response?.data as any)?.message ?? 'Có lỗi xảy ra',
								}}
							/>,
						)
					},
					onSuccess: () => {
						toast.success('Tạo thành công')
						accountDetailForm.reset()
						router.push(pageList.account.href)
					},
				},
			)
		} else {
			update(
				{
					path: { id: id },
					body: {
						role: data.role as 'admin' | 'user',
						fullName: data.name,
					},
				},
				{
					onError: (error) => {
						toast.error(
							<div
								dangerouslySetInnerHTML={{
									__html: (error.response?.data as any)?.message,
								}}
							/>,
						)
					},
					onSuccess: () => {
						toast.success('Cập nhật thành công')
						accountDetailForm.reset()
						queryClient.invalidateQueries({
							queryKey: usersControllerFindAllQueryKey(),
						})
						queryClient.invalidateQueries({
							queryKey: usersControllerFindOneQueryKey({
								path: { id: id ?? '' },
							}),
						})
						router.push(pageList.account.href)
					},
				},
			)
		}
	}

	return { accountDetailForm, onSubmit }
}

export default useAccountDetailController
