'use client'

import {
	equipmentRepairControllerFindOneOptions,
	equipmentRepairControllerRepairMutation,
	equipmentRepairControllerSearchQueryKey,
	equipmentRepairControllerUpdateMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import {
	type CreateEquipmentMaintenanceSchema,
	createEquipmentMaintenanceSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
	id?: string
}

const useMaintenanceDetailController = ({ id }: Props) => {
	const router = useRouter()

	const { data: repairDetail, isFetching } = useQuery({
		...equipmentRepairControllerFindOneOptions({
			path: {
				id: id ?? '',
			},
		}),
		enabled: !!id,
	})

	const defaultValues: CreateEquipmentMaintenanceSchema & {
		selectedEquipmentName: string
		selectedEquipmentQuantity: string
		selectedEquipmentNote: string
	} = {
		reason: '',
		repairLocation: '',
		reportNumber: '',
		sender: '',
		sentDate: new Date().toISOString(),
		notes: '',
		receivedDate: '',
		receiver: '',
		result: '',
		comment: '',
		items: [],
		selectedEquipmentName: '',
		selectedEquipmentNote: '',
		selectedEquipmentQuantity: '',
		fromUnitId: '',
	}

	const form = useForm<
		CreateEquipmentMaintenanceSchema & {
			selectedEquipmentName: string
			selectedEquipmentQuantity: string
			selectedEquipmentNote: string
		}
	>({
		resolver: zodResolver(createEquipmentMaintenanceSchema as any),
		defaultValues,
	})

	const { mutate: updateRepair, isPending: isPendingUpdate } = useMutation({
		...equipmentRepairControllerUpdateMutation(),
	})

	const { mutate: createRepair, isPending: isPendingCreate } = useMutation({
		...equipmentRepairControllerRepairMutation(),
	})

	const onSubmit = (data: CreateEquipmentMaintenanceSchema) => {
		const submitData = {
			fromUnitId: data.fromUnitId as any,
			items: (data.items || []).map((item: any) => ({
				instanceId: item.instanceId,
				unitOfMeasure: item.unitOfMeasure || 'Bộ',
				quantity: item.quantity,
				notes: item.note || item.notes || '',
			})) as any,
			reason: data.reason,
			repairDate: new Date(data.sentDate).toISOString(),
			receivedDate: data.receivedDate
				? new Date(data.receivedDate).toISOString()
				: undefined,
			reportNumber: data.reportNumber,
			receiver: data.receiver,
			sender: data.sender,
			comment: data.comment,
			notes: data.notes,
			repairLocation: data.repairLocation,
			type: 'repair' as const,
			repairResult: data.result,
		}

		if (id) {
			// Update existing repair
			updateRepair(
				{
					path: { id },
					body: submitData as any,
				},
				{
					onSuccess: () => {
						toast.success('Cập nhật thành công')
						queryClient.invalidateQueries({
							queryKey: equipmentRepairControllerSearchQueryKey(),
						})
						router.push('/equipment-set/maintenance')
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
			// Create new repair
			createRepair(
				{
					body: submitData as any,
				},
				{
					onSuccess: () => {
						toast.success('Tạo mới thành công')
						queryClient.invalidateQueries({
							queryKey: equipmentRepairControllerSearchQueryKey(),
						})
						router.push('/equipment-set/maintenance')
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
		if (repairDetail) {
			form.reset({
				reason: repairDetail.reason || '',
				repairLocation: repairDetail.repairLocation || '',
				reportNumber: repairDetail.reportNumber || '',
				sender: repairDetail.sender || '',
				sentDate: repairDetail.repairDate
					? new Date(repairDetail.repairDate).toISOString()
					: new Date().toISOString(),
				notes: repairDetail.notes || '',
				receivedDate: repairDetail.receivedDate
					? new Date(repairDetail.receivedDate).toISOString()
					: undefined,
				receiver: repairDetail.receiver || '',
				result: repairDetail.repairResult || '',
				comment: repairDetail.comment || '',
				items:
					repairDetail.items?.map((item: any) => {
						return {
							instanceId: item.instanceId?._id || item.instanceId,
							componentName: item.instanceId?.name || 'N/A',
							unitOfMeasure: item.unitOfMeasure || 'Bộ',
							quantity: item.quantity || 0,
							notes: item.notes || '',
						}
					}) || [],
				selectedEquipmentName: '',
				selectedEquipmentQuantity: '',
				selectedEquipmentNote: '',
				fromUnitId:
					repairDetail.fromUnitId?._id ||
					(repairDetail.fromUnitId as any) ||
					'',
			})
		}
	}, [repairDetail, form])

	return {
		form,
		onSubmit,
		repairDetail,
		isFetching,
		isUpdating: isPendingUpdate || isPendingCreate,
	}
}

export default useMaintenanceDetailController
