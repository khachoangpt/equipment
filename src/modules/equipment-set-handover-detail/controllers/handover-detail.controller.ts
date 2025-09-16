import type { ObjectId } from '@/client'
import {
	activityLogsControllerFindByInstanceOptions,
	equipmentHandoverControllerHandoverMutation,
	equipmentInstancesControllerSearchQueryKey,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import type { CreateEquipmentSetHandoverSchema } from '@/configs/schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
	id?: string
}

const useHandoverDetailController = ({ id }: Props) => {
	const defaultValues: CreateEquipmentSetHandoverSchema & {
		selectedEquipmentName: string
		selectedEquipmentQuantity: string
		selectedEquipmentNote: string
	} = {
		handoverDate: new Date().toISOString(),
		reportNumber: '',
		approver: '',
		comment: '',
		fromUnitId: '',
		toUnitId: '',
		handoverApprovedBy: '',
		handoverRejectedBy: '',
		items: [],
		receiver: '',
		sender: '',
		selectedEquipmentName: '',
		selectedEquipmentNote: '',
		selectedEquipmentQuantity: '',
	}
	const form = useForm<
		CreateEquipmentSetHandoverSchema & {
			selectedEquipmentName: string
			selectedEquipmentQuantity: string
			selectedEquipmentNote: string
		}
	>({
		defaultValues,
	})
	const { data: handoverFound, isFetching } = useQuery({
		...activityLogsControllerFindByInstanceOptions({
			path: { instanceId: id ?? '' },
		}),
	})
	const { mutate: create } = useMutation({
		...equipmentHandoverControllerHandoverMutation(),
	})
	const router = useRouter()

	useEffect(() => {
		if (!id) return

		if (handoverFound) {
			form.reset({})
		}
	}, [id, isFetching])

	const onSubmit: SubmitHandler<CreateEquipmentSetHandoverSchema> = (data) => {
		create(
			{
				body: {
					fromUnitId: data.fromUnitId as unknown as ObjectId,
					handoverDate: new Date(data.handoverDate).toISOString(),
					reportNumber: data.reportNumber,
					toUnitId: data.toUnitId as unknown as ObjectId,
					approver: data.approver,
					comment: data.comment,
					receiver: data.receiver,
					sender: data.sender,
					handoverApprovedBy: data.handoverApprovedBy,
					handoverRejectedBy: data.handoverRejectedBy,
					items: (data.items || []) as any,
				},
			},
			{
				onError: (error) => {
					toast.error((error.response?.data as any)?.message)
				},
				onSuccess: () => {
					toast.success('Tạo thành công')
					queryClient.invalidateQueries({
						queryKey: equipmentInstancesControllerSearchQueryKey(),
					})
					router.push(pageList.equipmentSetHandover.href)
				},
			},
		)
	}

	return { form, onSubmit }
}

export default useHandoverDetailController
