import {
	type SearchEquipmentHandoverSchema,
	searchEquipmentHandoverSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsString, useQueryStates } from 'nuqs'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

const useSearchEquipmentHandoverController = () => {
	const defaultValues: SearchEquipmentHandoverSchema = {
		reportNumber: '',
		fromUnitId: '',
		toUnitId: '',
		handoverDateStart: '',
		handoverDateEnd: '',
		createdById: '',
		receiver: '',
		sender: '',
		equipmentQuery: '',
	}
	const form = useForm({
		defaultValues,
		resolver: zodResolver(searchEquipmentHandoverSchema),
	})
	const [searchQuery, setSearchQuery] = useQueryStates({
		reportNumber: parseAsString.withDefault(''),
		fromUnitId: parseAsString.withDefault(''),
		toUnitId: parseAsString.withDefault(''),
		handoverDateStart: parseAsString.withDefault(''),
		handoverDateEnd: parseAsString.withDefault(''),
		receiver: parseAsString.withDefault(''),
		sender: parseAsString.withDefault(''),
		equipmentQuery: parseAsString.withDefault(''),
	})

	useEffect(() => {
		form.setValue('reportNumber', searchQuery.reportNumber)
		form.setValue('fromUnitId', searchQuery.fromUnitId)
		form.setValue('toUnitId', searchQuery.toUnitId)
		form.setValue('handoverDateStart', searchQuery.handoverDateStart)
		form.setValue('handoverDateEnd', searchQuery.handoverDateEnd)
		form.setValue('receiver', searchQuery.receiver)
		form.setValue('sender', searchQuery.sender)
		form.setValue('equipmentQuery', searchQuery.equipmentQuery)
	}, [searchQuery])

	const onSubmit: SubmitHandler<SearchEquipmentHandoverSchema> = (data) => {
		setSearchQuery(data)
	}

	return { form, onSubmit, defaultValues }
}

export default useSearchEquipmentHandoverController
