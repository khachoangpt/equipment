import { componentsControllerFindOneOptions } from '@/client/@tanstack/react-query.gen'
import type { ComponentDetailSchema } from '@/configs/schema'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useComponentDetailController = ({ id }: Props) => {
	const defaultValues: ComponentDetailSchema = {
		category: '',
		name: '',
		quantity: 0,
		storageLocation: '',
		supplyUnit: '',
		time: new Date().toISOString(),
		unitOfMeasure: '',
		files: '',
		note: '',
		receiverUnit: '',
		reviewContent: '',
		reviewUnit: '',
		technicalFeatures: '',
	}
	const form = useForm<ComponentDetailSchema>({
		defaultValues,
	})
	const { data, isPending } = useQuery({
		...componentsControllerFindOneOptions({
			path: { id: id ?? '' },
		}),
		enabled: !!id,
	})

	useEffect(() => {
		if (!id) return

		if (data) {
			const component = data as any

			form.reset({
				category: component?.equipmentId ?? '',
				name: component?.name ?? '',
				unitOfMeasure: component?.unitOfMeasure ?? '',
				quantity: component?.quantityInStock ?? 0,
				time: component?.time ?? new Date().toISOString(),
				supplyUnit: component?.supplyingUnit ?? '',
				receiverUnit: component?.receivingUnit ?? '',
				reviewUnit: component?.evaluatingUnit ?? '',
				reviewContent: component?.evaluationContent ?? '',
				storageLocation: component?.storageLocation ?? '',
				technicalFeatures: component?.technicalFeatures ?? '',
				note: component?.notes ?? '',
			})
		}
	}, [id, isPending])

	return { form }
}

export default useComponentDetailController
