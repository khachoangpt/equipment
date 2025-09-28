import type { CreateEquipmentDisposalSchema } from '@/configs/schema'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useLiquidationDetailController = (_: Props) => {
	const defaultValues: CreateEquipmentDisposalSchema & {
		selectedEquipmentName: string
		selectedEquipmentQuantity: string
		selectedEquipmentNote: string
	} = {
		createdBy: '',
		decisionNumber: '',
		disposalDate: new Date().toISOString(),
		signer: '',
		notes: '',
		invoiceNumber: '',
		items: [],
		selectedEquipmentName: '',
		selectedEquipmentNote: '',
		selectedEquipmentQuantity: '',
		fromUnitId: '',
	}
	const form = useForm<
		CreateEquipmentDisposalSchema & {
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

export default useLiquidationDetailController
