import { syncEquipmentControllerFindOneOptions } from '@/client/@tanstack/react-query.gen'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useEquipmentSetDetailController = ({ id }: Props) => {
	const defaultValues: any = {
		name: '',
		serialNumber: '',
		currentUnitId: '',
		groupId: '',
		qualityLevelId: '',
		status: '',
		initialPrice: 0,
	}
	const form = useForm<any>({
		defaultValues,
	})
	const { data, isPending } = useQuery({
		...syncEquipmentControllerFindOneOptions({ path: { id: id ?? '' } }),
		enabled: !!id,
	})

	useEffect(() => {
		if (!id) return

		if (data) {
			const unit = data as any

			form.reset({
				name: unit?.name ?? '',
				serialNumber: unit?.serialNumber ?? '',
				currentUnit: unit?.currentUnit?._id ?? '',
				group: unit?.group?._id ?? '',
				quality: unit?.qualityLevel?._id ?? '',
				status: unit?.status ?? '',
				initialPrice: unit?.initialPrice ?? 0,
			})
		}
	}, [id, isPending])

	return { form }
}

export default useEquipmentSetDetailController
