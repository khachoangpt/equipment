import { componentsControllerFindOneOptions } from '@/client/@tanstack/react-query.gen'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useComponentDetailController = ({ id }: Props) => {
	const defaultValues: any = {
		name: '',
		unitOfMeasure: '',
		quantityInStock: 0,
		storageLocation: '',
	}
	const form = useForm<any>({
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
			const unit = data as any

			form.reset({
				name: unit?.name ?? '',
				unitOfMeasure: unit?.unitOfMeasure ?? '',
				quantityInStock: unit?.quantityInStock ?? 0,
				storageLocation: unit?.storageLocation ?? '',
			})
		}
	}, [id, isPending])

	return { form }
}

export default useComponentDetailController
