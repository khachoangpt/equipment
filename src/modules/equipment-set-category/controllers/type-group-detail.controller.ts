import { categoriesControllerFindOneOptions } from '@/client/@tanstack/react-query.gen'
import {
	type TypeGroupDetailSchema,
	typeGroupDetailSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
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
	const { data, isPending } = useQuery({
		...categoriesControllerFindOneOptions({ path: { id: id ?? '' } }),
		enabled: !!id,
	})

	useEffect(() => {
		if (!id) return

		const typeGroupFound = data as any
		if (typeGroupFound) {
			typeGroupDetailForm.reset({
				code: typeGroupFound.code,
				name: typeGroupFound.name,
				note: typeGroupFound.notes,
			})
		}
	}, [id, isPending])

	return {
		typeGroupDetailForm,
	}
}

export default useTypeGroupDetailController
