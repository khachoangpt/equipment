'use client'

import type { ImageAttachment } from '@/client'
import {
	componentsControllerFindAllOptions,
	syncEquipmentControllerFindAllOptions,
} from '@/client/@tanstack/react-query.gen'
import Combobox from '@/components/custom/combobox/Combobox'
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
import { Textarea } from '@/components/ui/textarea'
import { pageList } from '@/configs/routes'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { genImageUrl } from '@/utils/gen-image-url'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowBigLeftDash, File, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, useEffect, useState } from 'react'
import useAssembledEquipmentConfigController from '../../controllers/assembled-equipment-config.controller'

type Props = {
	id?: string
}

const AssembledEquipmentConfigForm = ({ id }: Props) => {
	const {
		form,
		handleSelectComponent,
		onSubmit,
		config,
		isFetching: isFetchingConfig,
	} = useAssembledEquipmentConfigController({ id })
	const { control } = form
	const router = useRouter()
	const [previewImages, setPreviewImages] = useState<
		ImageAttachment[] | undefined
	>(form.getValues('images'))

	const [previewDocuments, setPreviewDocuments] = useState<
		ImageAttachment[] | undefined
	>(form.getValues('documents'))
	const { data: syncEquipments } = useQuery({
		...syncEquipmentControllerFindAllOptions({
			query: {
				page: 1,
				limit: 1000000,
			},
		}),
	})

	useEffect(() => {
		if (!isFetchingConfig && config) {
			setPreviewImages((prev) => [
				...(prev ?? []),
				...(config?.images?.filter((a: any) => a.activityType === 'IMAGE') ??
					[]),
			])
			setPreviewDocuments((prev) => [
				...(prev ?? []),
				...(config?.images?.filter((a: any) => a.activityType === 'DOCUMENT') ??
					[]),
			])
		}
	}, [config, isFetchingConfig])

	const { data: components } = useQuery({
		...componentsControllerFindAllOptions({
			query: {
				page: 1,
				limit: 1000000,
			},
		}),
		select: (data) =>
			data.data.map((item) => ({ value: item._id, label: item.name, ...item })),
	})

	const columns: ColumnDef<{
		index: number
		componentName: string
		unitOfMeasure: string
		quantity: number
		note: string
	}>[] = [
		{
			accessorKey: 'index',
			header: 'STT',
			cell: ({ row }) => {
				return <div>{row.index + 1}</div>
			},
		},
		{
			accessorKey: 'componentName',
			header: 'Tên vật tư/linh kiện',
		},
		{
			accessorKey: 'unitOfMeasure',
			header: 'Đơn vị tính',
		},
		{
			accessorKey: 'quantity',
			header: 'Số lượng',
		},
		{
			accessorKey: 'note',
			header: 'Ghi chú',
		},
		{
			id: 'actions',
			enableSorting: false,
			enableHiding: false,
			cell: ({ row }) => {
				const original = row.original

				return (
					<div className="flex items-center gap-x-2">
						<div
							className="text-red-600 cursor-pointer"
							onClick={() => {
								const componentList = (
									form.getValues('componentList') ?? []
								).filter(
									(item) => item.componentId !== (original as any).componentId,
								)
								form.setValue('componentList', componentList)
							}}
						>
							Xoá
						</div>
					</div>
				)
			},
		},
	]

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
			?.find((i: any) => i.url === image.url)
		if (imageFound) {
			form.setValue(
				'images',
				form.getValues('images')?.filter((i: any) => i.url !== image.url),
			)
		}
		form.setValue(
			'imageFiles',
			form
				.getValues('imageFiles')
				?.filter((file: any) => file.preview !== image.url),
		)
		setPreviewImages(newImages.filter((i) => i.url !== image.url))
	}

	const handleDeleteDocument = (document: ImageAttachment) => {
		const newDocuments = [...(previewDocuments ?? [])]
		const documentFound = form
			.getValues('documents')
			?.find((i: any) => i.url === document.url)
		if (documentFound) {
			form.setValue(
				'documents',
				form.getValues('documents')?.filter((i: any) => i.url !== document.url),
			)
		}
		form.setValue(
			'documentFiles',
			form
				.getValues('documentFiles')
				?.filter((file: any) => file.preview !== document.url),
		)
		setPreviewDocuments(newDocuments.filter((i) => i.url !== document.url))
	}

	return (
		<div>
			<Card>
				<Form {...form}>
					<div className="grid gap-y-5 gap-x-20 grid-cols-2">
						<FormField
							control={control}
							name="equipmentId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Danh mục</FormLabel>
									<FormControl>
										<Combobox
											options={(syncEquipments?.data || [])?.map((e) => ({
												value: e._id,
												label: e.name,
											}))}
											value={value || ''}
											onChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div />
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên trang bị</FormLabel>
									<FormControl>
										<Input placeholder="Tên trang bị" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div />
						<FormField
							control={control}
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
						<div />
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
										className="h-40 w-2/3"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* <FormField
						control={form.control}
						name="documentUrls"
						render={({ field: { onChange } }) => (
							<FormItem className="mt-5">
								<FormLabel>Tài liệu</FormLabel>
								<FormControl>
									<div className="flex items-center gap-x-5">
										<Input
											type="file"
											placeholder="Tài liệu"
											className="w-1/2"
											onChange={(e) => {
												onChange([e.target.files?.[0]])
											}}
										/>
										{form.watch('documentUrls')[0] &&
											typeof form.watch('documentUrls')[0] === 'string' && (
												<Button
													variant={'ghost'}
													onClick={() => {
														const url =
															form.getValues('documentUrls')?.[
																form.getValues('documentUrls')?.length - 1
															]
														window.open(
															`${process.env.NEXT_PUBLIC_API_URL}${url}`,
															'_blank',
														)
													}}
												>
													Tải về
												</Button>
											)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
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
													? `assembly-equipments/configs/${config._id}/images/${image._id}`
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
													? `assembly-equipments/configs/${config._id}/images/${document._id}`
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
						name="notes"
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
					<div className="flex gap-x-5 items-center mt-10">
						<FormField
							control={form.control}
							name="componentList"
							render={({ field: { value } }) => (
								<FormItem className="mt-5">
									<FormLabel>Danh mục vật tư/linh kiện lắp ghép</FormLabel>
									<FormControl>
										<DataTable
											columns={columns}
											data={value ? (value as any) : []}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="button"
							onClick={handleSelectComponent}
							disabled={
								!(
									form.watch('selectedComponentName') &&
									form.watch('selectedComponentQuantity')
								)
							}
						>
							<ArrowBigLeftDash className="size-7" />
						</Button>
						<Card className="h-full w-1/3 flex-none">
							<FormField
								control={control}
								name="selectedComponentName"
								render={({ field }) => (
									<FormItem className="flex w-full">
										<FormLabel className="flex-none w-24">
											Vật tư/linh kiện
										</FormLabel>
										<FormControl>
											<div className="w-full">
												<Combobox
													onChange={field.onChange}
													options={components || []}
													value={field.value}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="selectedComponentQuantity"
								render={({ field }) => (
									<FormItem className="flex">
										<FormLabel className="flex-none w-24">Số lượng</FormLabel>
										<FormControl>
											<Input type="text" placeholder="Số lượng" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="selectedComponentNote"
								render={({ field }) => (
									<FormItem className="flex items-start">
										<FormLabel className="flex-none w-24">Ghi chú</FormLabel>
										<FormControl>
											<Textarea placeholder="Ghi chú" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</Card>
					</div>
					<div className="mt-10 flex items-center justify-end gap-x-5">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								router.push(pageList.assembledEquipmentConfig.href)
							}}
						>
							Quay lại
						</Button>
						<Button onClick={form.handleSubmit(onSubmit as any)}>
							{id ? 'Sửa' : 'Thêm'}
						</Button>
					</div>
				</Form>
			</Card>
		</div>
	)
}

export default AssembledEquipmentConfigForm
