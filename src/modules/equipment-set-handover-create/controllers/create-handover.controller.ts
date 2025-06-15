import {
	type CreateEquipmentSetHandoverSchema,
	createEquipmentSetHandoverSchema,
} from '@/configs/schema'
import { equipmentHandovers } from '@/mocks/equipment.mock'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useCreateHandoverController = ({ id }: Props) => {
	const defaultValues: CreateEquipmentSetHandoverSchema = {
		code: '',
		receiverPerson: '',
		receiverUnit: '',
		handoverDate: '',
		equipment: '',
		note: '',
	}
	const form = useForm<CreateEquipmentSetHandoverSchema>({
		defaultValues,
		resolver: zodResolver(createEquipmentSetHandoverSchema),
	})

	useEffect(() => {
		if (!id) return

		const handoverFound = equipmentHandovers.find(
			(handover) => handover.id === id,
		)
		if (handoverFound) {
			form.reset({
				code: handoverFound.code,
				receiverPerson: handoverFound.receiverPerson,
				receiverUnit: handoverFound.receiverUnit,
				handoverDate: handoverFound.handoverDate,
				equipment: handoverFound.equipmentName,
				note: handoverFound.note,
			})
		}
	}, [id])

	return { form }
}

export default useCreateHandoverController
