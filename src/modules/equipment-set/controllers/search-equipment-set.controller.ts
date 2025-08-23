import {
	type SearchEquipmentSetSchema,
	searchEquipmentSetSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsString, useQueryStates } from 'nuqs'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

const useSearchEquipmentSetController = () => {
	const defaultValues: SearchEquipmentSetSchema = {
		serialNumber: '',
		name: '',
		entryPlanNumber: '',
		qualityLevelId: '',
		status: '',
		usingUnitId: '',
		countryOfOrigin: '',
		groupId: '',
	}
	const form = useForm({
		defaultValues,
		resolver: zodResolver(searchEquipmentSetSchema),
	})
	const [searchQuery, setSearchQuery] = useQueryStates({
		serialNumber: parseAsString.withDefault(''),
		name: parseAsString.withDefault(''),
		entryPlanNumber: parseAsString.withDefault(''),
		qualityLevelId: parseAsString.withDefault(''),
		status: parseAsString.withDefault(''),
		usingUnitId: parseAsString.withDefault(''),
		countryOfOrigin: parseAsString.withDefault(''),
		groupId: parseAsString.withDefault(''),
	})

	useEffect(() => {
		form.setValue('serialNumber', searchQuery.serialNumber)
		form.setValue('name', searchQuery.name)
		form.setValue('entryPlanNumber', searchQuery.entryPlanNumber)
		form.setValue('qualityLevelId', searchQuery.qualityLevelId)
		form.setValue('status', searchQuery.status)
		form.setValue('usingUnitId', searchQuery.usingUnitId)
		form.setValue('countryOfOrigin', searchQuery.countryOfOrigin)
		form.setValue('groupId', searchQuery.groupId)
	}, [searchQuery])

	const onSubmit: SubmitHandler<SearchEquipmentSetSchema> = (data) => {
		setSearchQuery(data)
	}

	return { form, onSubmit, defaultValues }
}

export default useSearchEquipmentSetController
