'use client'

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
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowBigLeftDash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useAssembledEquipmentConfigController from '../../controllers/assembled-equipment-config.controller'

type Props = {
	id?: string
}

const AssembledEquipmentConfigForm = ({ id }: Props) => {
	const { form, handleSelectComponent, onSubmit } =
		useAssembledEquipmentConfigController({ id })
	const { control } = form
	const router = useRouter()
	const { data: syncEquipments } = useQuery({
		...syncEquipmentControllerFindAllOptions({
			query: {
				page: 1,
				limit: 1000000,
			},
		}),
	})

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
								const componentList = form
									.getValues('componentList')
									.filter(
										(item) =>
											item.componentId !== (original as any).componentId,
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
					<FormField
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
					/>
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
									<FormItem className="flex">
										<FormLabel className="flex-none w-24">
											Vật tư/linh kiện
										</FormLabel>
										<FormControl>
											<Combobox
												onChange={field.onChange}
												options={components || []}
												value={field.value}
											/>
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
						<Button onClick={form.handleSubmit(onSubmit)}>
							{id ? 'Sửa' : 'Thêm'}
						</Button>
					</div>
				</Form>
			</Card>
		</div>
	)
}

export default AssembledEquipmentConfigForm
