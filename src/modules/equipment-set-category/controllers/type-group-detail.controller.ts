import {
	type TypeGroupDetailSchema,
	typeGroupDetailSchema,
} from '@/configs/schema'
import { equipmentSetTypeGroups } from '@/mocks/equipment.mock'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useTypeGroupDetailController = ({ id }: Props) => {
	const defaultValues: TypeGroupDetailSchema = {
		code: '',
		name: '',
		note: '',
	}
	const typeGroupDetailForm = useForm({
		defaultValues,
		resolver: zodResolver(typeGroupDetailSchema),
	})

	useEffect(() => {
		if (!id) return

		const typeGroupFound = equipmentSetTypeGroups.find(
			(typeGroup) => typeGroup.id === id,
		)
		if (typeGroupFound) {
			typeGroupDetailForm.reset({
				code: typeGroupFound.code,
				name: typeGroupFound.name,
				note: typeGroupFound.note,
			})
		}
	}, [id])

	return {
		typeGroupDetailForm,
	}
}

export default useTypeGroupDetailController
