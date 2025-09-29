'use client'
import type { ImageAttachment } from '@/client'
import {
	equipmentInstancesControllerCreateMutation,
	equipmentInstancesControllerSearchQueryKey,
	equipmentInstancesControllerUpdateMutation,
	qualityLevelsControllerFindAllOptions,
	syncEquipmentControllerFindAllOptions,
	unitsControllerFindAllOptions,
} from '@/client/@tanstack/react-query.gen'
import Combobox from '@/components/custom/combobox/Combobox'
import { DatePicker } from '@/components/custom/date-picker/DatePicker'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import type { EquipmentSetDetailSchema } from '@/configs/schema'
import useUploadFile from '@/hooks/use-upload-file'
import { genImageUrl } from '@/utils/gen-image-url'
import { SelectValue } from '@radix-ui/react-select'
import { useMutation, useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import useEquipmentSetDetailController from '../../controllers/equipment-set-detail.controller'

type Props = {
	id?: string
}

const EquipmentSetDetailForm = ({ id }: Props) => {
	const router = useRouter()
	const { form, data, isFetching } = useEquipmentSetDetailController({ id })
	const [previewImages, setPreviewImages] = useState<
		ImageAttachment[] | undefined
	>(form.getValues('images'))
	const { mutate: create } = useMutation({
		...equipmentInstancesControllerCreateMutation(),
	})
	const { data: syncEquipments } = useQuery({
		...syncEquipmentControllerFindAllOptions(),
		select(data) {
			return data?.data
		},
	})
	const { mutate: update } = useMutation({
		...equipmentInstancesControllerUpdateMutation(),
	})
	const { data: units } = useQuery({
		...unitsControllerFindAllOptions(),
		select(data) {
			return data?.data
		},
	})
	const { data: quantityList } = useQuery({
		...qualityLevelsControllerFindAllOptions(),
		select(data) {
			return data?.data
		},
	})
	const { uploadFile } = useUploadFile()

	useEffect(() => {
		if (!isFetching && data) {
			setPreviewImages((prev) => [...(prev ?? []), ...data.images])
		}
	}, [data, isFetching])

	const handleChooseImages = (event: ChangeEvent<HTMLInputElement>) => {
		const previewImages = Array.from(event.target.files ?? []).map((file) => ({
			url: URL.createObjectURL(file),
		})) as ImageAttachment[]
		setPreviewImages((prev) => {
			const newPreviewImages = [...(prev ?? []), ...previewImages]
			const uniquePreviewImages = newPreviewImages.filter(
				(image, index, self) =>
					index === self.findIndex((i) => i.url === image.url),
			)
			return uniquePreviewImages
		})

		form.setValue(
			'imageFiles',
			Array.from(event.target.files ?? [])
				.map((file, index) => ({
					file,
					preview: previewImages[index].url,
				}))
				.filter(
					(image, index, self) =>
						index === self.findIndex((i) => i.preview === image.preview),
				),
		)
	}

	const onSubmit: SubmitHandler<EquipmentSetDetailSchema> = (data) => {
		if (!id) {
			create(
				{
					body: {
						...data,
						type: 'SYNCHRONIZED_EQUIPMENT',
						name:
							syncEquipments?.find((item) => item._id === data.equipmentId)
								?.name ?? '',
						unitOfMeasure: '',
						evaluatingUnitId: data.evaluatingUnitId
							? data.evaluatingUnitId
							: undefined,
						usingUnitId: data.usingUnitId ? data.usingUnitId : undefined,
						quantity: data.quantity ? data.quantity : 0,
						images: [],
					},
				},
				{
					onSuccess: (equipmentInstance) => {
						if (data?.imageFiles?.length && data?.imageFiles?.length > 0) {
							uploadFile(
								{
									body: { files: data.imageFiles.map((file) => file.file) },
									headers: {
										'x-equipment-instance-id': equipmentInstance?._id,
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
								},
							)
						}

						toast.success('Tạo thành công')
						router.push(pageList.equipmentSet.href)
						queryClient.invalidateQueries({
							queryKey: equipmentInstancesControllerSearchQueryKey(),
						})
					},
					onError: (error) => {
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
			update(
				{
					path: {
						id: id,
					},
					body: {
						...data,
						evaluatingUnitId: data.evaluatingUnitId
							? data.evaluatingUnitId
							: undefined,
						usingUnitId: data.usingUnitId ? data.usingUnitId : undefined,
						images: data.images,
					},
				},
				{
					onSuccess: () => {
						if (data?.imageFiles?.length && data?.imageFiles?.length > 0) {
							uploadFile(
								{
									body: { files: data.imageFiles.map((f) => f.file) },
									headers: {
										'x-equipment-instance-id': id,
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
								},
							)
						}
						toast.success('Cập nhật thành công')
						queryClient.invalidateQueries({
							queryKey: equipmentInstancesControllerSearchQueryKey(),
						})
						router.push(pageList.equipmentSet.href)
					},
					onError: (error) => {
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

	const handleDeleteImage = (image: ImageAttachment) => {
		const newImages = [...(previewImages ?? [])]
		const imageFound = form
			.getValues('images')
			?.find((i) => i.url === image.url)
		if (imageFound) {
			form.setValue(
				'images',
				form.getValues('images')?.filter((i) => i.url !== image.url),
			)
		}
		form.setValue(
			'imageFiles',
			form
				.getValues('imageFiles')
				?.filter((file) => file.preview !== image.url),
		)
		setPreviewImages(newImages.filter((i) => i.url !== image.url))
	}

	return (
		<div>
			<Card>
				<Form {...form}>
					<div className="grid gap-y-5 gap-x-20 grid-cols-2">
						<FormField
							control={form.control}
							name="equipmentId"
							render={({ field: { onChange, value } }) => (
								<FormItem key={value}>
									<FormLabel>Loại trang bị</FormLabel>
									<FormControl>
										<Combobox
											options={(syncEquipments || []).map((e) => ({
												value: e._id,
												label: e.name,
											}))}
											value={value}
											onChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="serialNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mã hiệu serial</FormLabel>
									<FormControl>
										<Input placeholder="Mã hiệu serial" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="entryPlanNumber"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Số kế hoạch nhập</FormLabel>
									<FormControl>
										<Input
											placeholder="Số kế hoạch nhập"
											value={value}
											onChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="supplySource"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Nguồn cấp</FormLabel>
									<FormControl>
										<Input
											placeholder="Nguồn cấp"
											value={value}
											onChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="currentPrice"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Giá tiền hiện tại</FormLabel>
									<FormControl>
										<Input
											placeholder="Giá tiền hiện tại"
											value={value}
											onChange={(e) => {
												if (Number.isNaN(Number(e.target.value))) return
												onChange(Number(e.target.value))
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="entryDate"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Ngày nhập</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => onChange(e.toISOString())}
											value={new Date(value ?? '')}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="productionDate"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Ngày sản xuất</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => onChange(e.toISOString())}
											value={value ? new Date(value ?? '') : undefined}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="importingUnitId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị nhập</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{units?.map((quantity: any) => (
													<SelectItem key={quantity._id} value={quantity._id}>
														{quantity.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="evaluatingUnitId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị đánh giá</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{units?.map((quantity: any) => (
													<SelectItem key={quantity._id} value={quantity._id}>
														{quantity.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="evaluationResult"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Kết quả đánh giá</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Kết quả đánh giá"
											value={value}
											onChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="usingUnitId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị sử dụng</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{units?.map((unit: any) => (
													<SelectItem key={unit._id} value={unit._id}>
														{unit.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="qualityLevelId"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Phân cấp chất lượng</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{quantityList?.map((quantity: any) => (
													<SelectItem key={quantity._id} value={quantity._id}>
														{quantity.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="quantity"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Số lượng</FormLabel>
									<FormControl>
										<Input
											placeholder="Số lượng"
											value={value}
											onChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tình trạng trang bị</FormLabel>
									<FormControl>
										<Input placeholder="Tình trạng trang bị" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="featureConfiguration"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cấu hình tính năng</FormLabel>
									<FormControl>
										<Textarea placeholder="Cấu hình tính năng" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="technicalSpecifications"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thông số kỹ thuật</FormLabel>
									<FormControl>
										<Textarea placeholder="Thông số kỹ thuật" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<FormField
								control={form.control}
								name="images"
								render={() => (
									<FormItem>
										<FormLabel>Hình ảnh trang bị</FormLabel>
										<FormControl>
											<Input
												placeholder="Hình ảnh trang bị"
												type="file"
												multiple
												accept="image/*"
												onChange={(e) => handleChooseImages(e)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{previewImages && previewImages?.length > 0 && (
								<div className="mt-5 flex flex-wrap gap-4	">
									{previewImages?.map((image) => (
										<div key={image.url} className="relative">
											<img
												src={genImageUrl(
													image._id
														? `equipments/instances/images/${image._id}`
														: image.url,
												)}
												alt=""
												className="w-40 h-auto object-contain"
											/>
											<div
												onClick={() => handleDeleteImage(image)}
												className="absolute size-6 flex items-center justify-center top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-pointer bg-primary rounded-full text-white"
											>
												<X className="size-5" />
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
					<div className="mt-10 flex items-center justify-end gap-x-5">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								router.push(pageList.equipmentSet.href)
							}}
						>
							Quay lại
						</Button>
						<Button onClick={form.handleSubmit(onSubmit)}>
							{id ? 'Cập nhật' : 'Thêm'}
						</Button>
					</div>
				</Form>
			</Card>
		</div>
	)
}

export default EquipmentSetDetailForm
