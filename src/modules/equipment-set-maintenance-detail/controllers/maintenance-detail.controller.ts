import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useMaintenanceDetailController = (_: Props) => {
	const defaultValues: any = {
		equipmentId: '',
		voucherNumber: '',
		location: '',
		sendDate: new Date().toString(),
		receiveDate: new Date().toString(),
		reason: '',
		result: '',
		notes: '',
	}
	const form = useForm<any>({
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
