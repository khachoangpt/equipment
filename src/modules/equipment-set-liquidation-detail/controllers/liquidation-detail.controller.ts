import {
	equipmentDisposeControllerFindByDecisionNumberOptions,
	equipmentDisposeControllerValidateQuantitiesMutation,
} from '@/client/@tanstack/react-query.gen'
import type { CreateEquipmentDisposalSchema } from '@/configs/schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
	id?: string
}

const useLiquidationDetailController = ({ id }: Props) => {
	const defaultValues: CreateEquipmentDisposalSchema & {
		selectedEquipmentName: string
		selectedEquipmentQuantity: string
		selectedEquipmentNote: string
	} = {
		createdBy: '',
		decisionNumber: '',
		disposalDate: new Date().toISOString(),
		signer: '',
		notes: '',
		invoiceNumber: '',
		items: [],
		selectedEquipmentName: '',
		selectedEquipmentNote: '',
		selectedEquipmentQuantity: '',
		fromUnitId: '',
	}
	const form = useForm<
		CreateEquipmentDisposalSchema & {
			selectedEquipmentName: string
			selectedEquipmentQuantity: string
			selectedEquipmentNote: string
		}
	>({
		defaultValues,
	})

	const { data: liquidationData } = useQuery({
		...equipmentDisposeControllerFindByDecisionNumberOptions({
			path: { decisionNumber: id || '' },
		}),
		enabled: Boolean(id),
	})

	const { mutate: validateQuantities, isPending: isValidating } = useMutation({
		...equipmentDisposeControllerValidateQuantitiesMutation(),
	})

	const validateEquipmentQuantities = (data: CreateEquipmentDisposalSchema) => {
		return new Promise((resolve, reject) => {
			const submitData: any = {
				decisionNumber: data.decisionNumber,
				disposalDate: new Date(data.disposalDate).toISOString(),
				fromUnitId: data.fromUnitId || undefined,
				items: (data.items || []).map((item: any) => ({
					instanceId: item.instanceId,
					unitOfMeasure: item.unitOfMeasure || 'Bộ',
					quantity: item.quantity,
					notes: item.notes || '',
				})),
				signer: data.signer,
				type: 'disposal',
				approver: data.createdBy,
				notes: data.notes,
			}

			if (submitData.fromUnitId === '') {
				submitData.fromUnitId = undefined
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

	useEffect(() => {
		if (!id) {
			return
		}
		if (!liquidationData) {
			return
		}

		form.reset({
			decisionNumber: liquidationData.decisionNumber,
			disposalDate: liquidationData.disposalDate,
			fromUnitId: (liquidationData.fromUnitId as any)?._id || '',
			signer: liquidationData.signer,
			notes: liquidationData.notes,
			createdBy: liquidationData.approver,
			items:
				liquidationData.items?.map((item) => ({
					instanceId: item.instanceId,
					serialNumber: item?.equipmentDetails?.serialNumber,
					componentName: item?.equipmentDetails?.name || 'N/A',
					unitOfMeasure: item.unitOfMeasure || 'Bộ',
					quantity: item.quantity,
					notes: item.notes ?? '',
				})) || [],
			selectedEquipmentName: '',
			selectedEquipmentNote: '',
			selectedEquipmentQuantity: '',
		})
	}, [id, liquidationData, form])

	return {
		form,
		liquidationData,
		validateEquipmentQuantities,
		isValidating,
	}
}

export default useLiquidationDetailController
