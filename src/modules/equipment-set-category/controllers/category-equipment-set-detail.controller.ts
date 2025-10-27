import { syncEquipmentControllerFindOneOptions } from '@/client/@tanstack/react-query.gen'
import {
	type CategoryEquipmentSetDetailSchema,
	categoryEquipmentSetDetailSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useCategoryEquipmentSetDetailController = ({ id }: Props) => {
	const defaultValues: CategoryEquipmentSetDetailSchema = {
		name: '',
		type: '',
		field: '',
		defaultAmount: 0,
		note: '',
	}
	const categoryEquipmentSetDetailForm =
		useForm<CategoryEquipmentSetDetailSchema>({
			defaultValues,
			resolver: zodResolver(categoryEquipmentSetDetailSchema),
		})
	const { data: categoryFound, isFetching } = useQuery({
		...syncEquipmentControllerFindOneOptions({ path: { id: id ?? '' } }),
	})

	useEffect(() => {
		if (!id) return

		if (categoryFound) {
			categoryEquipmentSetDetailForm.reset({
				name: categoryFound.name,
				type: categoryFound.groupId._id,
				field: categoryFound.field,
				defaultAmount: categoryFound.initialPrice,
				note: categoryFound.notes,
			})
		}
	}, [id, isFetching])

	return {
		categoryEquipmentSetDetailForm,
	}
}

export default useCategoryEquipmentSetDetailController
