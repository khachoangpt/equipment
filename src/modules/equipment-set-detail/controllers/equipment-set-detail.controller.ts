import { equipmentsControllerFindOneOptions } from '@/client/@tanstack/react-query.gen'
import {
	type EquipmentSetDetailSchema,
	equipmentSetDetailSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useEquipmentSetDetailController = ({ id }: Props) => {
	const defaultValues: EquipmentSetDetailSchema = {
		name: '',
		amount: 0,
		typeGroup: '',
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
	const { data, isPending } = useQuery({
		...equipmentsControllerFindOneOptions({ path: { id: id ?? '' } }),
		enabled: !!id,
	})

	useEffect(() => {
		if (!id) return

		if (data) {
			form.reset({
				name: data.name,
				typeGroup: data.group?._id,
				amount: data.currentValue,
				importDate: data.entryDate,
				importPlanNumber: Number(data.entryPlanNumber),
				importUnit: data.mainUnit?.name,
				manufacturingDate: data.productionDate,
				origin: data.supplySource,
				quality: data.qualityLevel?._id,
				rateResult: data.evaluationResult,
				rateUnit: data.evaluatingUnit?.name,
				serial: data.code,
				status: data.status,
				usedUnit: data.currentUnit?.name,
			})
		}
	}, [id, isPending])

	return { form }
}

export default useEquipmentSetDetailController
