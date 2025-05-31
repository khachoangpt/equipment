import {
	type CategoryEquipmentSetDetailSchema,
	categoryEquipmentSetDetailSchema,
} from '@/configs/schema'
import { equipmentSetCategories } from '@/mocks/equipment.mock'
import { zodResolver } from '@hookform/resolvers/zod'
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

	useEffect(() => {
		if (!id) return

		const categoryFound = equipmentSetCategories.find(
			(category) => category.id === id,
		)
		if (categoryFound) {
			categoryEquipmentSetDetailForm.reset({
				name: categoryFound.name,
				type: categoryFound.type,
				field: categoryFound.field,
				defaultAmount: categoryFound.defaultAmount,
				note: categoryFound.note,
			})
		}
	}, [id])

	return {
		categoryEquipmentSetDetailForm,
	}
}

export default useCategoryEquipmentSetDetailController
