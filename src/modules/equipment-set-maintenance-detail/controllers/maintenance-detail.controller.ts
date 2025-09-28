import type { CreateEquipmentMaintenanceSchema } from '@/configs/schema'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useMaintenanceDetailController = (_: Props) => {
	const defaultValues: CreateEquipmentMaintenanceSchema & {
		selectedEquipmentName: string
		selectedEquipmentQuantity: string
		selectedEquipmentNote: string
	} = {
		reason: '',
		repairLocation: '',
		reportNumber: '',
		sender: '',
		sentDate: new Date().toISOString(),
		notes: '',
		receivedDate: new Date().toISOString(),
		receiver: '',
		result: '',
		comment: '',
		items: [],
		selectedEquipmentName: '',
		selectedEquipmentNote: '',
		selectedEquipmentQuantity: '',
		fromUnitId: '',
	}
	const form = useForm<
		CreateEquipmentMaintenanceSchema & {
			selectedEquipmentName: string
			selectedEquipmentQuantity: string
			selectedEquipmentNote: string
		}
	>({
		defaultValues,
	})

	// useEffect(() => {
	// 	if (!id) return

	// 	const handoverFound = equipmentHandovers.find(
	// 		(handover) => handover.id === id,
	// 	)
	// 	if (handoverFound) {
	// 		form.reset({
	// 			code: handoverFound.code,
	// 			handoverPerson: handoverFound.handoverPerson,
	// 			handoverUnit: handoverFound.handoverUnit,
	// 			receiverPerson: handoverFound.receiverPerson,
	// 			receiverUnit: handoverFound.receiverUnit,
	// 			handoverDate: handoverFound.handoverDate,
	// 			returnDate: handoverFound.returnDate,
	// 			equipmentName: handoverFound.equipmentName,
	// 			note: handoverFound.note,
	// 		})
	// 	}
	// }, [id])

	return { form }
}

export default useMaintenanceDetailController
