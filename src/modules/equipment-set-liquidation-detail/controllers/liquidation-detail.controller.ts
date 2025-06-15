import {
	type CreateEquipmentDisposalSchema,
	createEquipmentDisposalSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useLiquidationDetailController = (_: Props) => {
	const defaultValues: CreateEquipmentDisposalSchema = {
		createdBy: '',
		equipment: '',
		decisionNumber: '',
		disposalDate: new Date().toISOString(),
		signer: '',
		notes: '',
	}
	const form = useForm<CreateEquipmentDisposalSchema>({
		defaultValues,
		resolver: zodResolver(createEquipmentDisposalSchema),
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

export default useLiquidationDetailController
