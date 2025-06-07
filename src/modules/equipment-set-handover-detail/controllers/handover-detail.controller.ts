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

const useHandoverDetailController = ({ id }: Props) => {
	const defaultValues: CreateEquipmentSetHandoverSchema = {
		code: '',
		handoverPerson: '',
		handoverUnit: '',
		receiverPerson: '',
		receiverUnit: '',
		handoverDate: '',
		returnDate: '',
		equipmentName: '',
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
				handoverPerson: handoverFound.handoverPerson,
				handoverUnit: handoverFound.handoverUnit,
				receiverPerson: handoverFound.receiverPerson,
				receiverUnit: handoverFound.receiverUnit,
				handoverDate: handoverFound.handoverDate,
				returnDate: handoverFound.returnDate,
				equipmentName: handoverFound.equipmentName,
				note: handoverFound.note,
			})
		}
	}, [id])

	return { form }
}

export default useHandoverDetailController
