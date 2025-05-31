import { type QualityDetailSchema, qualityDetailSchema } from '@/configs/schema'
import { equipmentSetQuality } from '@/mocks/equipment.mock'
import { zodResolver } from '@hookform/resolvers/zod'
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

	useEffect(() => {
		if (!id) return

		const qualityFound = equipmentSetQuality.find(
			(quality) => quality.id === id,
		)
		if (qualityFound) {
			qualityDetailForm.reset({
				code: qualityFound.code,
				name: qualityFound.name,
				note: qualityFound.note,
			})
		}
	}, [id])

	return { qualityDetailForm }
}

export default useQualityDetailController
