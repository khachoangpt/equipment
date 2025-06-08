import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useLiquidationDetailController = (_: Props) => {
	const defaultValues: any = {
		decisionNumber: '',
		unit: '',
		liquidationDate: new Date().toString(),
		creator: '',
		equipmentList: [],
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

export default useLiquidationDetailController
