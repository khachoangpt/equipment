import { activityLogsControllerFindByInstanceOptions } from '@/client/@tanstack/react-query.gen'
import {
	type CreateEquipmentSetHandoverSchema,
	createEquipmentSetHandoverSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useHandoverDetailController = ({ id }: Props) => {
	const defaultValues: CreateEquipmentSetHandoverSchema = {
		code: '',
		senderPerson: '',
		receiverPerson: '',
		receiverUnit: '',
		handoverDate: new Date().toString(),
		equipment: '',
		note: '',
		comment: '',
	}
	const form = useForm<CreateEquipmentSetHandoverSchema>({
		defaultValues,
		resolver: zodResolver(createEquipmentSetHandoverSchema),
	})
	const { data: handoverFound, isFetching } = useQuery({
		...activityLogsControllerFindByInstanceOptions({
			path: { instanceId: id ?? '' },
		}),
	})

	useEffect(() => {
		if (!id) return

		if (handoverFound) {
			form.reset({
				code: handoverFound[0].details.code as string,
				senderPerson: handoverFound[0].details.handoverPerson as string,
				receiverPerson: handoverFound[0].details.receiverPerson as string,
				receiverUnit: handoverFound[0].details.receiverUnit as string,
				handoverDate: handoverFound[0].details.handoverDate as string,
				equipment: handoverFound[0].details.equipmentName as string,
				note: handoverFound[0].details.note as string,
				comment: handoverFound[0].details.comment as string,
			})
		}
	}, [id, isFetching])

	return { form }
}

export default useHandoverDetailController
