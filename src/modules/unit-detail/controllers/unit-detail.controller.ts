import {
	organizationControllerCreateUnitMutation,
	organizationControllerFindAllUnitsQueryKey,
	organizationControllerFindOneUnitOptions,
	organizationControllerFindOneUnitQueryKey,
	organizationControllerUpdateUnitMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
	id?: string
}

const useUnitDetailController = ({ id }: Props) => {
	const router = useRouter()
	const defaultValues: any = {
		mode: id ? 'edit' : 'create',
		name: '',
		code: '',
		parentUnitId: '',
	}
	const unitDetailForm = useForm<any>({
		defaultValues,
	})
	const { mutate: create } = useMutation({
		...organizationControllerCreateUnitMutation(),
	})
	const { mutate: update } = useMutation({
		...organizationControllerUpdateUnitMutation(),
	})
	const { data, isPending } = useQuery({
		...organizationControllerFindOneUnitOptions({ path: { id: id ?? '' } }),
		enabled: !!id,
	})

	useEffect(() => {
		if (id) {
			const unit = data as any
			if (unit) {
				unitDetailForm.reset({
					mode: 'edit',
					name: unit.name,
					code: unit.code,
					parentUnitId: unit.parentUnit._id,
				})
			}
		}
	}, [id, isPending])

	const onSubmit: SubmitHandler<any> = (data: any) => {
		if (!id) {
			create(
				{
					body: {
						name: data.name,
						code: data.code,
						parentUnitId: data.parentUnitId,
					},
				},
				{
					onError: () => {
						toast.error('Tạo đơn vị khônng thành công')
					},
					onSuccess: () => {
						toast.success('Tạo đơn vị thành công')
						unitDetailForm.reset()
						router.push(pageList.unit.href)
					},
				},
			)
		} else {
			update(
				{
					path: { id: id },
					body: {
						name: data.name,
						code: data.code,
						parentUnitId: data.parentUnitId,
					},
				},
				{
					onError: () => {
						toast.error('Lỗi sửa đơn vị')
					},
					onSuccess: () => {
						toast.success('Sửa đơn vị thành công')
						unitDetailForm.reset()
						queryClient.invalidateQueries({
							queryKey: organizationControllerFindAllUnitsQueryKey(),
						})
						queryClient.invalidateQueries({
							queryKey: organizationControllerFindOneUnitQueryKey({
								path: { id: id ?? '' },
							}),
						})
						router.push(pageList.unit.href)
					},
				},
			)
		}
	}

	return { unitDetailForm, onSubmit }
}

export default useUnitDetailController
