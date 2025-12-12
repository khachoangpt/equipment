import {
	type SearchEquipmentRepairSchema,
	searchEquipmentRepairSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsString, useQueryStates } from 'nuqs'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

const useSearchEquipmentRepairController = () => {
	const defaultValues: SearchEquipmentRepairSchema = {
		reportNumber: '',
		equipmentQuery: '',
		repairDateStart: '',
		repairDateEnd: '',
		fromUnitId: '',
		repairLocation: '',
	}
	const form = useForm({
		defaultValues,
		resolver: zodResolver(searchEquipmentRepairSchema),
	})
	const [searchQuery, setSearchQuery] = useQueryStates({
		reportNumber: parseAsString.withDefault(''),
		equipmentQuery: parseAsString.withDefault(''),
		repairDateStart: parseAsString.withDefault(''),
		repairDateEnd: parseAsString.withDefault(''),
		fromUnitId: parseAsString.withDefault(''),
		repairLocation: parseAsString.withDefault(''),
	})

	useEffect(() => {
		form.setValue('reportNumber', searchQuery.reportNumber)
		form.setValue('equipmentQuery', searchQuery.equipmentQuery)
		form.setValue('repairDateStart', searchQuery.repairDateStart)
		form.setValue('repairDateEnd', searchQuery.repairDateEnd)
		form.setValue('fromUnitId', searchQuery.fromUnitId)
		form.setValue('repairLocation', searchQuery.repairLocation)
	}, [searchQuery])

	const onSubmit: SubmitHandler<SearchEquipmentRepairSchema> = (data) => {
		setSearchQuery(data)
	}

	return { form, onSubmit, defaultValues }
}

export default useSearchEquipmentRepairController
