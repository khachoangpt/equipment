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
		imageFiles?: any
		documentFiles?: any
		images?: any
		documents?: any
	} = {
		componentList: [],
		images: [],
		imageFiles: [],
		documents: [],
		documentFiles: [],
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
			imageFiles?: any
			documentFiles?: any
			images?: any
			documents?: any
		}
	>({ defaultValues })

	const { data: components } = useQuery({
		...componentsControllerFindAllOptions(),
		select: (data) =>
			data?.data?.map((item) => ({
				value: item._id,
				label: item.name,
				...item,
			})),
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
				images: (config as any).images?.filter(
					(item: any) => item.activityType === 'IMAGE',
				),
				documents: (config as any).images?.filter(
					(item: any) => item.activityType === 'DOCUMENT',
				),
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

	const onSubmit: SubmitHandler<
		CreateAssembledProductConfigDto & {
			selectedComponentName: string
			selectedComponentQuantity: string
			selectedComponentNote: string
			imageFiles?: any
			documentFiles?: any
			images?: any
			documents?: any
		}
	> = async (data) => {
		if (!id) {
			createConfig(
				{
					body: {
						componentList: data?.componentList?.map((item: any) => ({
							componentId: item?.componentId,
							quantity: Number(item?.quantity),
							notes: item?.note ?? '',
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
					onError: (error) => {
						toast.error((error.response?.data as any)?.message)
					},
					onSuccess: (config: any) => {
						// if (data?.documentUrls?.length && data?.documentUrls?.length > 0) {
						// 	upload(
						// 		{
						// 			body: { documents: data?.documentUrls as any },
						// 			path: { id: config?._id },
						// 		},
						// 		{
						// 			onError: (error) => {
						// 				toast.error((error.response?.data as any)?.message)
						// 			},
						// 		},
						// 	)
						// }
						if (data?.imageFiles?.length && data?.imageFiles?.length > 0) {
							upload(
								{
									path: {
										id: config?._id,
									},
									body: {
										documents: data.imageFiles.map((file: any) => file.file),
									},
									headers: {
										'x-assembled-equipment-config-type': 'IMAGE',
									},
								},
								{
									onError: (error) => {
										toast.error((error.response?.data as any)?.message)
									},
								},
							)
						}
						if (
							data?.documentFiles?.length &&
							data?.documentFiles?.length > 0
						) {
							upload(
								{
									path: {
										id: config?._id,
									},
									body: {
										documents: data.documentFiles.map((file: any) => file.file),
									},
									headers: {
										'x-assembled-equipment-config-type': 'DOCUMENT',
									},
								},
								{
									onError: (error) => {
										toast.error((error.response?.data as any)?.message)
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
							notes: item?.note ?? '',
						})),
						equipmentId: data?.equipmentId,
						name: data?.name,
						unitOfMeasure: data?.unitOfMeasure,
						notes: data?.notes,
						technicalFeatures: data?.technicalFeatures,
						documentUrls: [...(data.images ?? []), ...(data.documents ?? [])],
					},
				},
				{
					onError: (error) => {
						toast.error((error.response?.data as any)?.message)
					},
					onSuccess: (config: any) => {
						// if (
						// 	data?.documentUrls?.length &&
						// 	data?.documentUrls?.length > 0 &&
						// 	typeof data?.documentUrls?.[0] !== 'string'
						// ) {
						// 	upload({
						// 		body: { documents: data?.documentUrls as any },
						// 		path: { id: config?._id },
						// 	})
						// }
						if (data?.imageFiles?.length && data?.imageFiles?.length > 0) {
							upload(
								{
									path: {
										id: config?._id,
									},
									body: { documents: data.imageFiles.map((f: any) => f.file) },
									headers: {
										'x-assembled-equipment-config-type': 'IMAGE',
									},
								},
								{
									onError: (error) => {
										toast.error((error.response?.data as any)?.message)
									},
								},
							)
						}
						if (
							data?.documentFiles?.length &&
							data?.documentFiles?.length > 0
						) {
							upload(
								{
									path: {
										id: config?._id,
									},
									body: {
										documents: data.documentFiles.map((file: any) => file.file),
									},
									headers: {
										'x-assembled-equipment-config-type': 'DOCUMENT',
									},
								},
								{
									onError: (error) => {
										toast.error((error.response?.data as any)?.message)
									},
								},
							)
						}
						toast.success('Cập nhật thành công')
						form.reset()
						router.push(pageList.assembledEquipmentConfig.href)
					},
				},
			)
		}
	}

	return {
		form,
		handleSelectComponent,
		onSubmit,
		config: config as any,
		isFetching,
	}
}

export default useAssembledEquipmentConfigController
