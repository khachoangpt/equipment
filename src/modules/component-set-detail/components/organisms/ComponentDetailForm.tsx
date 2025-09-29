'use client'

import type { ImageAttachment } from '@/client'
import {
	componentsControllerCreateMutation,
	componentsControllerFindAllQueryKey,
	componentsControllerUpdateMutation,
	componentsControllerUploadFilesMutation,
	equipmentGroupsControllerFindAllOptions,
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
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import type { ComponentDetailSchema } from '@/configs/schema'
import { genImageUrl } from '@/utils/gen-image-url'
import { useMutation, useQuery } from '@tanstack/react-query'
import { File, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import useComponentDetailController from '../../controllers/component-detail.controller'

type Props = {
	id?: string
}

const ComponentDetailForm = ({ id }: Props) => {
	const router = useRouter()
	const { form, data, isFetching } = useComponentDetailController({ id })
	const [previewImages, setPreviewImages] = useState<
		ImageAttachment[] | undefined
	>(form.getValues('images'))
	const [previewDocuments, setPreviewDocuments] = useState<
		ImageAttachment[] | undefined
	>(form.getValues('documents'))
	const { mutate: create } = useMutation({
		...componentsControllerCreateMutation(),
	})
	const { mutate: update } = useMutation({
		...componentsControllerUpdateMutation(),
	})
	const { data: units } = useQuery({
		...unitsControllerFindAllOptions({
			query: { limit: 1000000, page: 1 },
		}),
	})
	const { data: typeGroups } = useQuery({
		...equipmentGroupsControllerFindAllOptions({
			query: { type: 'EQUIPMENT_GROUP', limit: 1000000, page: 1 },
		}),
	})
	const { mutate: uploadFile } = useMutation({
		...componentsControllerUploadFilesMutation(),
	})

	const onSubmit = (data: ComponentDetailSchema) => {
		if (!id) {
			create(
				{
					body: {
						equipmentId: data?.category ?? '',
						name: data?.name ?? '',
						unitOfMeasure: data?.unitOfMeasure ?? '',
						quantityInStock: Number(data?.quantity) ?? 0,
						time: new Date(data?.time).toISOString(),
						supplyingUnitId: data?.supplyUnit ?? '',
						receivingUnitId: data?.receiverUnit ?? '',
						evaluatingUnitId: data?.reviewUnit ?? '',
						evaluationContent: data?.reviewContent ?? '',
						storageLocation: data?.storageLocation ?? '',
						technicalFeatures: data?.technicalFeatures ?? '',
						notes: data?.note ?? '',
					},
				},
				{
					onSuccess: (component) => {
						if (data?.imageFiles?.length && data?.imageFiles?.length > 0) {
							uploadFile(
								{
									path: {
										id: component?._id,
									},
									body: { files: data.imageFiles.map((file) => file.file) },
									headers: {
										'x-component-attachment-type': 'IMAGE',
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
						if (
							data?.documentFiles?.length &&
							data?.documentFiles?.length > 0
						) {
							uploadFile(
								{
									path: {
										id: component?._id,
									},
									body: { files: data.documentFiles.map((file) => file.file) },
									headers: {
										'x-component-attachment-type': 'DOCUMENT',
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
						router.push(pageList.assembledEquipmentComponent.href)
						queryClient.invalidateQueries({
							queryKey: componentsControllerFindAllQueryKey(),
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
						equipmentId: data?.category ?? '',
						name: data?.name ?? '',
						unitOfMeasure: data?.unitOfMeasure ?? '',
						quantityInStock: Number(data?.quantity) ?? 0,
						time: new Date(data?.time).toISOString(),
						supplyingUnitId: data?.supplyUnit ?? '',
						receivingUnitId: data?.receiverUnit ?? '',
						evaluatingUnitId: data?.reviewUnit ?? '',
						evaluationContent: data?.reviewContent ?? '',
						storageLocation: data?.storageLocation ?? '',
						technicalFeatures: data?.technicalFeatures ?? '',
						notes: data?.note ?? '',
						documentAttachments: [
							...(data.images ?? []),
							...(data.documents ?? []),
						],
					},
				},
				{
					onSuccess: (component) => {
						if (data?.imageFiles?.length && data?.imageFiles?.length > 0) {
							uploadFile(
								{
									path: {
										id: component?._id,
									},
									body: { files: data.imageFiles.map((f) => f.file) },
									headers: {
										'x-component-attachment-type': 'IMAGE',
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
						if (
							data?.documentFiles?.length &&
							data?.documentFiles?.length > 0
						) {
							uploadFile(
								{
									path: {
										id: component?._id,
									},
									body: { files: data.documentFiles.map((file) => file.file) },
									headers: {
										'x-component-attachment-type': 'DOCUMENT',
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
						toast.success('Cập nhật thành cong')
						queryClient.invalidateQueries({
							queryKey: componentsControllerFindAllQueryKey(),
						})
						router.push(pageList.assembledEquipmentComponent.href)
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

	useEffect(() => {
		if (!isFetching && data) {
			setPreviewImages((prev) => [
				...(prev ?? []),
				...data.attachments.filter((a) => a.activityType === 'IMAGE'),
			])
			setPreviewDocuments((prev) => [
				...(prev ?? []),
				...data.attachments.filter((a) => a.activityType === 'DOCUMENT'),
			])
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

	const handleChooseDocuments = (event: ChangeEvent<HTMLInputElement>) => {
		const previewDocuments = Array.from(event.target.files ?? []).map(
			(file) => ({
				url: URL.createObjectURL(file),
			}),
		) as ImageAttachment[]
		setPreviewDocuments((prev) => {
			const newPreviewDocuments = [...(prev ?? []), ...previewDocuments]
			const uniquePreviewDocuments = newPreviewDocuments.filter(
				(document, index, self) =>
					index === self.findIndex((i) => i.url === document.url),
			)
			return uniquePreviewDocuments
		})

		form.setValue(
			'documentFiles',
			Array.from(event.target.files ?? [])
				.map((file, index) => ({
					file,
					preview: previewDocuments[index].url,
				}))
				.filter(
					(document, index, self) =>
						index === self.findIndex((i) => i.preview === document.preview),
				),
		)
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

	const handleDeleteDocument = (document: ImageAttachment) => {
		const newDocuments = [...(previewDocuments ?? [])]
		const documentFound = form
			.getValues('documents')
			?.find((i) => i.url === document.url)
		if (documentFound) {
			form.setValue(
				'documents',
				form.getValues('documents')?.filter((i) => i.url !== document.url),
			)
		}
		form.setValue(
			'documentFiles',
			form
				.getValues('documentFiles')
				?.filter((file) => file.preview !== document.url),
		)
		setPreviewDocuments(newDocuments.filter((i) => i.url !== document.url))
	}

	return (
		<div>
			<Card>
				<Form {...form}>
					<div className="grid gap-y-5 gap-x-20 grid-cols-2">
						<FormField
							control={form.control}
							name="category"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Danh mục</FormLabel>
									<FormControl>
										<Combobox
											options={(typeGroups?.data || []).map((e) => ({
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
						<div />
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên vật tư/linh kiện</FormLabel>
									<FormControl>
										<Input placeholder="Tên vật tư/linh kiện" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div />
						<FormField
							control={form.control}
							name="unitOfMeasure"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đơn vị tính</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Đơn vị tính"
											{...field}
											className="w-1/2"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số lượng</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Số lượng"
											{...field}
											className="w-1/2"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="time"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thời gian</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => field.onChange(e.toString())}
											value={new Date(field.value || '')}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div />
						<FormField
							control={form.control}
							name="supplyUnit"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị cấp</FormLabel>
									<FormControl>
										<Select key={value} value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Đơn vị cấp" />
											</SelectTrigger>
											<SelectContent>
												{units?.data?.map((unit) => (
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
						<div />
						<FormField
							control={form.control}
							name="receiverUnit"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị nhận</FormLabel>
									<FormControl>
										<Select key={value} value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Đơn vị nhận" />
											</SelectTrigger>
											<SelectContent>
												{units?.data?.map((unit) => (
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
						<div />
						<div>
							<FormField
								control={form.control}
								name="reviewUnit"
								render={({ field: { value, onChange } }) => (
									<FormItem>
										<FormLabel>Đơn vị đánh giá</FormLabel>
										<FormControl>
											<Select
												key={value}
												value={value}
												onValueChange={onChange}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Đơn vị đánh giá" />
												</SelectTrigger>
												<SelectContent>
													{units?.data?.map((unit) => (
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
						</div>
						<FormField
							control={form.control}
							name="reviewContent"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nội dung đánh giá</FormLabel>
									<FormControl>
										<Textarea placeholder="Nội dung đánh giá" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="storageLocation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Vị trí lưu trữ</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Vị trí lưu trữ"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="technicalFeatures"
						render={({ field }) => (
							<FormItem className="mt-5">
								<FormLabel>Tính năng kỹ thuật</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Tính năng kỹ thuật"
										className="h-40"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="mt-5">
						<FormField
							control={form.control}
							name="images"
							render={() => (
								<FormItem className="w-1/2">
									<FormLabel>Hình ảnh minh hoạ</FormLabel>
									<FormControl>
										<Input
											placeholder="Hình ảnh trang bị"
											type="file"
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
													? `assembly-equipments/components/images/${image._id}`
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
					<div>
						<FormField
							control={form.control}
							name="documents"
							render={() => (
								<FormItem className="mt-5">
									<FormLabel>Tài liệu</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept=".doc,.docx,.pdf,.mp4,.avi,.mov,.mp3,.wav"
											placeholder="Tài liệu"
											className="w-1/2"
											onChange={(e) => handleChooseDocuments(e)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{previewDocuments && previewDocuments?.length > 0 && (
							<div className="mt-5 flex flex-wrap gap-5	">
								{previewDocuments?.map((document) => (
									<div key={document.url} className="relative">
										<Link
											href={genImageUrl(
												document._id
													? `assembly-equipments/components/images/${document._id}`
													: document.url,
											)}
											target="_blank"
											className="px-4 py-2 flex items-center gap-2 bg-primary text-white rounded-md"
										>
											<File className="size-5" />
											<span>Tài liệu (Xem)</span>
										</Link>
										<div
											onClick={() => handleDeleteDocument(document)}
											className="absolute size-6 flex items-center justify-center top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-pointer bg-primary rounded-full text-white"
										>
											<X className="size-5" />
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					<FormField
						control={form.control}
						name="note"
						render={({ field }) => (
							<FormItem className="mt-5">
								<FormLabel>Ghi chú</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Ghi chú"
										className="w-2/3"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="mt-10 flex items-center justify-end gap-x-5">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								router.push(pageList.assembledEquipmentComponent.href)
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

export default ComponentDetailForm
