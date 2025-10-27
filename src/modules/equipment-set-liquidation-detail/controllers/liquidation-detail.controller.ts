import { equipmentDisposeControllerFindOneOptions } from '@/client/@tanstack/react-query.gen'
import type { CreateEquipmentDisposalSchema } from '@/configs/schema'
import { useQuery } from '@tanstack/react-query'
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
		...equipmentDisposeControllerFindOneOptions({ path: { id: id || '' } }),
		enabled: Boolean(id),
	})

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
			fromUnitId: liquidationData.fromUnitId?._id || '',
			signer: liquidationData.signer,
			notes: liquidationData.notes,
			createdBy: liquidationData.approver,
			items:
				liquidationData.items?.map((item: any) => ({
					instanceId: item.instanceId,
					componentName: item.componentName,
					unitOfMeasure: item.unitOfMeasure || 'Bộ',
					quantity: item.quantity,
					note: item.note || '',
				})) || [],
			selectedEquipmentName: '',
			selectedEquipmentNote: '',
			selectedEquipmentQuantity: '',
		})
	}, [id, liquidationData, form])

	return { form, liquidationData }
}

export default useLiquidationDetailController
