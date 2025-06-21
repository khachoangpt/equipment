import { equipmentInstancesControllerFindOneOptions } from '@/client/@tanstack/react-query.gen'
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
		equipmentId: '',
		serialNumber: '',
		entryPlanNumber: '',
		importingUnitId: '',
		usingUnitId: '',
		evaluatingUnitId: '',
		evaluationResult: '',
		qualityLevelId: '',
		currentPrice: 0,
		quantity: 0,
		entryDate: new Date().toISOString(),
		productionDate: undefined,
		supplySource: '',
		status: '',
		images: [],
		imageFiles: [],
	}
	const form = useForm<EquipmentSetDetailSchema>({
		defaultValues,
		resolver: zodResolver(equipmentSetDetailSchema),
	})
	const { data, isFetching } = useQuery({
		...equipmentInstancesControllerFindOneOptions({ path: { id: id ?? '' } }),
		enabled: !!id,
	})

	useEffect(() => {
		if (!id) return

		if (data) {
			form.reset({
				currentPrice: data.currentPrice,
				entryDate: data.entryDate,
				productionDate: data.productionDate,
				entryPlanNumber: data.entryPlanNumber,
				supplySource: data.supplySource,
				qualityLevelId: data.qualityLevelId._id,
				status: data.status,
				equipmentId: data.equipmentId._id,
				serialNumber: data.serialNumber,
				evaluatingUnitId: data.evaluatingUnitId?._id,
				evaluationResult: data.evaluationResult,
				usingUnitId: data.usingUnitId?._id,
				importingUnitId: data.importingUnitId._id,
				quantity: data.quantity,
				images: data.images ?? [],
			})
		}
	}, [id, isFetching])

	return { form, data, isFetching }
}

export default useEquipmentSetDetailController
