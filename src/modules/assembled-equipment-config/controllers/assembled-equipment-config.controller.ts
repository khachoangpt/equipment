import type { CreateAssembledProductConfigDto } from '@/client'
import {
	assembledEquipmentControllerCreateConfigMutation,
	assembledEquipmentControllerFindConfigByIdOptions,
	assembledEquipmentControllerUpdateConfigMutation,
	assembledEquipmentControllerUploadFilesMutation,
	componentsControllerFindAllOptions,
} from '@/client/@tanstack/react-query.gen'
import { pageList } from '@/configs/routes'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
	id?: string
}

const useAssembledEquipmentConfigController = ({ id }: Props) => {
	const defaultValues: CreateAssembledProductConfigDto & {
		selectedComponentName: string
		selectedComponentQuantity: string
		selectedComponentNote: string
	} = {
		componentList: [],
		documentUrls: [],
		equipmentId: '',
		name: '',
		unitOfMeasure: '',
		notes: '',
		technicalFeatures: '',
		selectedComponentName: '',
		selectedComponentNote: '',
		selectedComponentQuantity: '',
	}
	const form = useForm<
		CreateAssembledProductConfigDto & {
			selectedComponentName: string
			selectedComponentQuantity: string
			selectedComponentNote: string
		}
	>({ defaultValues })

	const { data: components } = useQuery({
		...componentsControllerFindAllOptions(),
		select: (data) =>
			data.map((item) => ({ value: item._id, label: item.name, ...item })),
	})
	const { mutate: createConfig } = useMutation({
		...assembledEquipmentControllerCreateConfigMutation(),
	})
	const { mutate: updateConfig } = useMutation({
		...assembledEquipmentControllerUpdateConfigMutation(),
	})
	const { mutate: upload } = useMutation({
		...assembledEquipmentControllerUploadFilesMutation(),
	})
	const { data: config, isFetching } = useQuery({
		...assembledEquipmentControllerFindConfigByIdOptions({
			path: { id: id as any },
		}),
	})
	const router = useRouter()

	useEffect(() => {
		if (!isFetching && config) {
			form.reset({
				equipmentId: (config as any).equipmentId,
				name: (config as any).name,
				unitOfMeasure: (config as any).unitOfMeasure,
				technicalFeatures: (config as any).technicalFeatures,
				documentUrls: (config as any).images?.map((item: any) => item.url),
				notes: (config as any).notes,
				componentList: (config as any).componentList.map((item: any) => ({
					componentId: item?.component?._id,
					componentName: item?.component?.name,
					unitOfMeasure: item?.component?.unitOfMeasure,
					quantity: item?.quantity,
					note: item?.notes,
				})),
			})
		}
	}, [config, isFetching])

	const handleSelectComponent = () => {
		const component = components?.find(
			(item) => item.value === form.watch('selectedComponentName'),
		)
		const componentList = form
			.getValues('componentList')
			.filter((item) => item.componentId !== component?._id)
		form.setValue('componentList', [
			...componentList,
			{
				componentId: component?._id,
				componentName: component?.name,
				unitOfMeasure: component?.unitOfMeasure,
				quantity: form.watch('selectedComponentQuantity'),
				note: form.watch('selectedComponentNote'),
			} as any,
		])
	}

	const onSubmit: SubmitHandler<CreateAssembledProductConfigDto> = async (
		data,
	) => {
		if (!id) {
			createConfig(
				{
					body: {
						componentList: data?.componentList?.map((item: any) => ({
							componentId: item?.componentId,
							quantity: Number(item?.quantity),
							notes: item?.note,
						})),
						equipmentId: data?.equipmentId,
						name: data?.name,
						unitOfMeasure: data?.unitOfMeasure,
						notes: data?.notes,
						technicalFeatures: data?.technicalFeatures,
						documentUrls: [],
					},
				},
				{
					onError: () => {
						toast.error('Tạo không thành công')
					},
					onSuccess: (config: any) => {
						if (data?.documentUrls?.length && data?.documentUrls?.length > 0) {
							upload(
								{
									body: { documents: data?.documentUrls as any },
									path: { id: config?._id },
								},
								{
									onError: () => {
										toast.error('Tạo khong thành cong')
									},
								},
							)
						}
						toast.success('Tạo thành công')
						form.reset()
						router.push(pageList.assembledEquipmentConfig.href)
					},
				},
			)
		} else {
			updateConfig(
				{
					path: { id: id as any },
					body: {
						componentList: data?.componentList?.map((item: any) => ({
							componentId: item?.componentId,
							quantity: Number(item?.quantity),
							notes: item?.note,
						})),
						equipmentId: data?.equipmentId,
						name: data?.name,
						unitOfMeasure: data?.unitOfMeasure,
						notes: data?.notes,
						technicalFeatures: data?.technicalFeatures,
					},
				},
				{
					onError: () => {
						toast.error('Cập nhật không thành công')
					},
					onSuccess: (config: any) => {
						if (
							data?.documentUrls?.length &&
							data?.documentUrls?.length > 0 &&
							typeof data?.documentUrls?.[0] !== 'string'
						) {
							upload({
								body: { documents: data?.documentUrls as any },
								path: { id: config?._id },
							})
						}
						toast.success('Cập nhật thành công')
						form.reset()
						router.push(pageList.assembledEquipmentConfig.href)
					},
				},
			)
		}
	}

	return { form, handleSelectComponent, onSubmit }
}

export default useAssembledEquipmentConfigController
