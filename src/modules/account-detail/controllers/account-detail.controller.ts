import {
	userControllerCreateMutation,
	userControllerGetAllQueryKey,
	userControllerGetByIdOptions,
	userControllerGetByIdQueryKey,
	userControllerUpdateMutation,
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
	const { mutate: create } = useMutation({ ...userControllerCreateMutation() })
	const { mutate: update } = useMutation({ ...userControllerUpdateMutation() })
	const { data, isPending } = useQuery({
		...userControllerGetByIdOptions({ path: { id: id ?? '' } }),
		enabled: !!id,
	})

	useEffect(() => {
		if (id) {
			const account = data as any
			if (account) {
				accountDetailForm.reset({
					mode: 'edit',
					name: account.firstName,
					username: account.username,
					password: undefined,
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
						username: data.username,
						firstName: data.name,
						lastName: ' ',
					},
				},
				{
					onError: () => {
						toast.error('Tạo tài khoản khônng thành công')
					},
					onSuccess: () => {
						toast.success('Tạo tài khoản thành công')
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
						password: data.password ?? '',
						role: data.role as 'admin' | 'user',
						username: data.username,
						firstName: data.name,
					},
				},
				{
					onError: () => {
						toast.error('Lỗi sửa tài khoản')
					},
					onSuccess: () => {
						toast.success('Sửa tài khoản thành công')
						accountDetailForm.reset()
						queryClient.invalidateQueries({
							queryKey: userControllerGetAllQueryKey(),
						})
						queryClient.invalidateQueries({
							queryKey: userControllerGetByIdQueryKey({
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
