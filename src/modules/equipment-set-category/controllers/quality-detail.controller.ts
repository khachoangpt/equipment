import { categoriesControllerFindOneOptions } from '@/client/@tanstack/react-query.gen'
import { type QualityDetailSchema, qualityDetailSchema } from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useQualityDetailController = ({ id }: Props) => {
	const defaultValues: QualityDetailSchema = {
		code: '',
		name: '',
		note: '',
	}
	const qualityDetailForm = useForm<QualityDetailSchema>({
		defaultValues,
		resolver: zodResolver(qualityDetailSchema),
	})
	const { data, isPending } = useQuery({
		...categoriesControllerFindOneOptions({ path: { id: id ?? '' } }),
		enabled: !!id,
	})

	useEffect(() => {
		if (!id) return
		const qualityFound = data as any
		if (qualityFound) {
			qualityDetailForm.reset({
				code: qualityFound.code,
				name: qualityFound.name,
				note: qualityFound.notes,
			})
		}
	}, [id, isPending])

	return { qualityDetailForm }
}

export default useQualityDetailController
