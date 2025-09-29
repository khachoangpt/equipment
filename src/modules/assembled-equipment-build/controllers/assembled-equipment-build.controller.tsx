import type { CreateBuildActivityDto } from '@/client'
import {
	assembledEquipmentControllerCreateBuildActivityMutation,
	assembledEquipmentControllerFindbuildActivityByIdOptions,
	assembledEquipmentControllerUpdateBuildActivityMutation,
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

const useAssembledEquipmentBuildController = ({ id }: Props) => {
	const defaultValues: CreateBuildActivityDto & {
		componentList: any
		equipmentId: string
	} = {
		equipmentId: '',
		buildingUnitId: '',
		configId: '',
		quantity: 0,
		notes: '',
		componentList: [],
	}
	const form = useForm<
		CreateBuildActivityDto & { componentList: any; equipmentId: string }
	>({
		defaultValues,
	})

	const { mutate: createBuild } = useMutation({
		...assembledEquipmentControllerCreateBuildActivityMutation(),
	})
	const { mutate: updateBuild } = useMutation({
		...assembledEquipmentControllerUpdateBuildActivityMutation(),
	})
	const { data: build, isFetching } = useQuery({
		...assembledEquipmentControllerFindbuildActivityByIdOptions({
			path: { id: id as any },
		}),
		enabled: !!id,
	})
	const router = useRouter()

	useEffect(() => {
		if (!isFetching && build) {
			form.reset({
				configId: (build as any)?.config?._id,
				quantity: (build as any)?.quantity,
				componentList: (build as any)?.componentList?.map((item: any) => ({
					componentId: item?.component?._id,
					componentName: item?.component?.name,
					unitOfMeasure: item?.component?.unitOfMeasure,
					quantity: item?.quantity,
					note: item?.notes,
				})),
				equipmentId: (build as any)?.config?.equipmentId,
				notes: (build as any)?.notes,
				buildingUnitId: (build as any)?.buildingUnit?._id,
			})
		}
	}, [build, isFetching])

	const onSubmit: SubmitHandler<CreateBuildActivityDto> = async (data) => {
		if (!id) {
			createBuild(
				{
					body: {
						buildingUnitId: data?.buildingUnitId,
						configId: data?.configId,
						quantity: Number(data?.quantity),
						notes: data?.notes,
					},
				},
				{
					onError: (error) => {
						toast.error(
							<div
								dangerouslySetInnerHTML={{
									__html: (error?.response?.data as any)?.message,
								}}
							/>,
						)
					},
					onSuccess: () => {
						toast.success('Tạo thành công')
						form.reset()
						router.push(pageList.assembledEquipmentBuild.href)
					},
				},
			)
		} else {
			updateBuild(
				{
					path: { id: id as any },
					body: {
						buildingUnitId: data?.buildingUnitId,
						configId: data?.configId,
						quantity: Number(data?.quantity),
						notes: data?.notes,
					},
				},
				{
					onError: (error) => {
						toast.error(
							<div
								dangerouslySetInnerHTML={{
									__html: (error.response?.data as any)?.message,
								}}
							/>,
						)
					},
					onSuccess: () => {
						toast.success('Cập nhật thành công')
						form.reset()
						router.push(pageList.assembledEquipmentBuild.href)
					},
				},
			)
		}
	}

	return { form, onSubmit }
}

export default useAssembledEquipmentBuildController
