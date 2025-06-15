import {
	type CreateEquipmentMaintenanceSchema,
	createEquipmentMaintenanceSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useMaintenanceDetailController = (_: Props) => {
	const defaultValues: CreateEquipmentMaintenanceSchema = {
		reason: '',
		equipment: '',
		repairLocation: '',
		reportNumber: '',
		sender: '',
		sentDate: new Date().toISOString(),
		notes: '',
		receivedDate: new Date().toISOString(),
		receiver: '',
		result: '',
	}
	const form = useForm<CreateEquipmentMaintenanceSchema>({
		defaultValues,
		resolver: zodResolver(createEquipmentMaintenanceSchema),
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
