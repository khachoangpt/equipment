import { equipmentInstancesControllerFindOneOptions } from '@/client/@tanstack/react-query.gen'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useAssembledEquipmentDetailController = ({ id }: Props) => {
	const defaultValues: any = {
		equipmentId: '',
		name: '',
		unitOfMeasure: '',
		quantity: 0,
		productionDate: new Date().toISOString(),
		importingUnitId: '',
		usingUnitId: '',
		evaluatingUnitId: '',
		evaluationResult: '',
		storageLocation: '',
		notes: '',
	}
	const form = useForm<any>({
		defaultValues,
	})
	const { data, isPending } = useQuery({
		...equipmentInstancesControllerFindOneOptions({
			path: { id: id ?? '' },
		}),
		enabled: !!id,
	})

	useEffect(() => {
		if (!id) return

		if (data) {
			const equipment = data as any

			form.reset({
				buildActivityId: equipment?.buildActivityId ?? '',
				equipmentId: equipment?.equipmentId?._id ?? '',
				unitOfMeasure: equipment?.unitOfMeasure ?? '',
				quantity: equipment?.quantity ?? 0,
				productionDate: equipment?.productionDate ?? new Date().toISOString(),
				importingUnitId: equipment?.importingUnitId?._id ?? '',
				usingUnitId: equipment?.usingUnitId?._id ?? '',
				evaluatingUnitId: equipment?.evaluatingUnitId?._id ?? '',
				evaluationResult: equipment?.evaluationResult ?? '',
				storageLocation: equipment?.storageLocation ?? '',
				notes: equipment?.notes ?? '',
			})
		}
	}, [id, isPending])

	return { form }
}

export default useAssembledEquipmentDetailController
