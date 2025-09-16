import {
	type SearchEquipmentDisposeSchema,
	searchEquipmentDisposeSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsString, useQueryStates } from 'nuqs'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

const useSearchEquipmentDisposeController = () => {
	const defaultValues: SearchEquipmentDisposeSchema = {
		createdById: '',
		decisionNumber: '',
		disposalDateEnd: '',
		disposalDateStart: '',
		equipmentQuery: '',
		search: '',
		signer: '',
		unitId: '',
	}
	const form = useForm({
		defaultValues,
		resolver: zodResolver(searchEquipmentDisposeSchema),
	})
	const [searchQuery, setSearchQuery] = useQueryStates({
		createdById: parseAsString.withDefault(''),
		decisionNumber: parseAsString.withDefault(''),
		disposalDateEnd: parseAsString.withDefault(''),
		disposalDateStart: parseAsString.withDefault(''),
		equipmentQuery: parseAsString.withDefault(''),
		search: parseAsString.withDefault(''),
		signer: parseAsString.withDefault(''),
		unitId: parseAsString.withDefault(''),
	})

	useEffect(() => {
		form.setValue('createdById', searchQuery.createdById)
		form.setValue('decisionNumber', searchQuery.decisionNumber)
		form.setValue('disposalDateEnd', searchQuery.disposalDateEnd)
		form.setValue('disposalDateStart', searchQuery.disposalDateStart)
		form.setValue('equipmentQuery', searchQuery.equipmentQuery)
		form.setValue('search', searchQuery.search)
		form.setValue('signer', searchQuery.signer)
		form.setValue('unitId', searchQuery.unitId)
	}, [searchQuery])

	const onSubmit: SubmitHandler<SearchEquipmentDisposeSchema> = (data) => {
		setSearchQuery(data)
	}

	return { form, onSubmit, defaultValues }
}

export default useSearchEquipmentDisposeController
