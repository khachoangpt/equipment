'use client'

import {
	equipmentHandoverControllerHandoverMutation,
	equipmentHandoverControllerSearchOptions,
	equipmentHandoverControllerSearchQueryKey,
	equipmentHandoverControllerUpdateMutation,
	equipmentHandoverControllerValidateQuantitiesMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const handoverDetailSchema = z.object({
	reportNumber: z.string().min(1, 'Số biên bản bàn giao là bắt buộc'),
	receiver: z.string().optional(),
	approver: z.string().optional(),
	sender: z.string().optional(),
	handoverApprovedBy: z.string().optional(),
	handoverRejectedBy: z.string().optional(),
	fromUnitId: z.string().min(1, 'Đơn vị giao là bắt buộc'),
	toUnitId: z.string().min(1, 'Đơn vị nhận là bắt buộc'),
	handoverDate: z.string().min(1, 'Ngày bàn giao là bắt buộc'),
	comment: z.string().optional(),
	type: z.enum(['handover', 'recall']).optional(),
	items: z.array(z.any()).min(1, 'Danh sách trang bị không được để trống'),
	// Fields for equipment selection
	selectedEquipmentName: z.string().optional(),
	selectedEquipmentQuantity: z.string().optional(),
	selectedEquipmentNote: z.string().optional(),
})

export type HandoverDetailFormData = z.infer<typeof handoverDetailSchema>

const useHandoverDetailController = (id?: string) => {
	const router = useRouter()

	const { data: handoverDetail, isFetching } = useQuery({
		...equipmentHandoverControllerSearchOptions({
			query: {
				limit: 1,
				page: 1,
				_id: id,
			},
		}),
		enabled: !!id,
		select: (data: any) => data?.data?.[0],
	})

	const form = useForm<HandoverDetailFormData>({
		resolver: zodResolver(handoverDetailSchema),
		defaultValues: {
			reportNumber: '',
			receiver: '',
			approver: '',
			sender: '',
			handoverApprovedBy: '',
			handoverRejectedBy: '',
			fromUnitId: '',
			toUnitId: '',
			handoverDate: '',
			comment: '',
			type: 'handover',
			items: [],
			selectedEquipmentName: '',
			selectedEquipmentQuantity: '',
			selectedEquipmentNote: '',
		},
	})

	const { mutate: updateHandover, isPending: isPendingUpdate } = useMutation({
		...equipmentHandoverControllerUpdateMutation(),
	})

	const { mutate: createHandover, isPending: isPendingCreate } = useMutation({
		...equipmentHandoverControllerHandoverMutation(),
	})

	const { mutate: validateQuantities, isPending: isValidating } = useMutation({
		...equipmentHandoverControllerValidateQuantitiesMutation(),
	})

	const validateEquipmentQuantities = (data: HandoverDetailFormData) => {
		return new Promise((resolve, reject) => {
			const submitData = {
				...data,
				items: data.items.map((item: any) => ({
					instanceId: item.instanceId,
					unitOfMeasure: item.unitOfMeasure || 'Bộ',
					quantity: item.quantity,
					notes: item.note || '',
				})),
			}

			validateQuantities(
				{
					body: submitData as any,
				},
				{
					onSuccess: (response) => {
						resolve(response)
					},
					onError: (error) => {
						reject(error)
					},
				},
			)
		})
	}

	const onSubmit = (data: HandoverDetailFormData) => {
		const submitData = {
			...data,
			items: data.items.map((item: any) => ({
				instanceId: item.instanceId,
				unitOfMeasure: item.unitOfMeasure || 'Bộ',
				quantity: item.quantity,
				notes: item.note || '',
			})),
		}

		if (id) {
			// Update existing handover
			updateHandover(
				{
					path: { id },
					body: submitData as any,
				},
				{
					onSuccess: () => {
						toast.success('Cập nhật thành công')
						queryClient.invalidateQueries({
							queryKey: equipmentHandoverControllerSearchQueryKey(),
						})
						router.push('/equipment-set/handover')
					},
					onError: (error: any) => {
						toast.error(
							<div
								dangerouslySetInnerHTML={{
									__html: (error.response?.data as any)?.message,
								}}
							/>,
						)
					},
				},
			)
		} else {
			// Create new handover
			createHandover(
				{
					body: submitData as any,
				},
				{
					onSuccess: () => {
						toast.success('Tạo mới thành công')
						queryClient.invalidateQueries({
							queryKey: equipmentHandoverControllerSearchQueryKey(),
						})
						router.push('/equipment-set/handover')
					},
					onError: (error: any) => {
						toast.error(
							<div
								dangerouslySetInnerHTML={{
									__html: (error.response?.data as any)?.message,
								}}
							/>,
						)
					},
				},
			)
		}
	}

	// Populate form when data is loaded
	React.useEffect(() => {
		if (handoverDetail) {
			form.reset({
				reportNumber: handoverDetail.reportNumber || '',
				receiver: handoverDetail.receiver || '',
				approver: handoverDetail.approver || '',
				sender: handoverDetail.sender || '',
				handoverApprovedBy: handoverDetail.handoverApprovedBy || '',
				handoverRejectedBy: handoverDetail.handoverRejectedBy || '',
				fromUnitId: handoverDetail.fromUnitId?._id || '',
				toUnitId: handoverDetail.toUnitId?._id || '',
				handoverDate: handoverDetail.handoverDate
					? new Date(handoverDetail.handoverDate).toISOString().split('T')[0]
					: '',
				comment: handoverDetail.comment || '',
				type: handoverDetail.type || 'handover',
				items:
					handoverDetail.items?.map((item: any) => {
						return {
							instanceId: item.instanceId?._id || item.instanceId,
							componentName: item.instanceId?.name || 'N/A',
							unitOfMeasure: item.unitOfMeasure || 'Bộ',
							quantity: item.quantity || 0,
							note: item.notes || '',
						}
					}) || [],
				selectedEquipmentName: '',
				selectedEquipmentQuantity: '',
				selectedEquipmentNote: '',
			})
		}
	}, [handoverDetail, form])

	return {
		form,
		onSubmit,
		handoverDetail,
		isFetching,
		isUpdating: isPendingUpdate || isPendingCreate,
		validateEquipmentQuantities,
		isValidating,
	}
}

export default useHandoverDetailController
