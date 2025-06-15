import {
	unitsControllerCreateMutation,
	unitsControllerFindAllQueryKey,
	unitsControllerFindOneOptions,
	unitsControllerFindOneQueryKey,
	unitsControllerUpdateMutation,
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
		...unitsControllerCreateMutation(),
	})
	const { mutate: update } = useMutation({
		...unitsControllerUpdateMutation(),
	})
	const { data: unit, isPending } = useQuery({
		...unitsControllerFindOneOptions({ path: { id: id ?? '' } }),
		enabled: !!id,
	})

	useEffect(() => {
		if (id) {
			if (unit) {
				unitDetailForm.reset({
					mode: 'edit',
					name: unit.name,
					code: unit.code,
					parentUnitId: unit?.parentId,
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
						parentId: data.parentUnitId,
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
						parentId: data.parentUnitId,
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
							queryKey: unitsControllerFindAllQueryKey(),
						})
						queryClient.invalidateQueries({
							queryKey: unitsControllerFindOneQueryKey({
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
