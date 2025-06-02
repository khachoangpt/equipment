import {
	type EquipmentSetDetailSchema,
	equipmentSetDetailSchema,
} from '@/configs/schema'
import { equipmentSets } from '@/mocks/equipment.mock'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useEquipmentSetDetailController = ({ id }: Props) => {
	const defaultValues: EquipmentSetDetailSchema = {
		name: '',
		amount: 0,
		importDate: new Date().toString(),
		importPlanNumber: 0,
		importUnit: '',
		manufacturingDate: new Date().toString(),
		origin: '',
		quality: '',
		rateResult: '',
		rateUnit: '',
		serial: '',
		status: '',
		usedUnit: '',
	}
	const form = useForm<EquipmentSetDetailSchema>({
		defaultValues,
		resolver: zodResolver(equipmentSetDetailSchema),
	})

	useEffect(() => {
		if (!id) return

		const equipmentSetFound = equipmentSets.find(
			(equipmentSet) => equipmentSet.id === id,
		)
		if (equipmentSetFound) {
			form.reset({
				name: equipmentSetFound.name,
				amount: equipmentSetFound.amount,
				importDate: equipmentSetFound.importDate,
				importPlanNumber: equipmentSetFound.importPlanNumber,
				importUnit: equipmentSetFound.importUnit,
				manufacturingDate: equipmentSetFound.manufacturingDate,
				origin: equipmentSetFound.origin,
				quality: equipmentSetFound.quality,
				rateResult: equipmentSetFound.rateResult,
				rateUnit: equipmentSetFound.rateUnit,
				serial: equipmentSetFound.serial,
				status: equipmentSetFound.status,
				usedUnit: equipmentSetFound.usedUnit,
			})
		}
	}, [id])

	return { form }
}

export default useEquipmentSetDetailController
