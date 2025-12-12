'use client'

import {
	equipmentInstancesControllerSearchOptions,
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
import { pageList } from '@/configs/routes'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowBigLeftDash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useMaintenanceDetailController from '../../controllers/maintenance-detail.controller'

type Props = {
	id?: string
}

const MaintenanceDetailForm = ({ id }: Props) => {
	const { form, onSubmit, isUpdating } = useMaintenanceDetailController({ id })
	const { control } = form
	const router = useRouter()
	const { data: units } = useQuery({
		...unitsControllerFindAllOptions({ query: { limit: 1000000, page: 1 } }),
	})
	const { data: equipments } = useQuery({
		...equipmentInstancesControllerSearchOptions({
			query: { limit: 1000000, page: 1, usingUnitId: form.watch('fromUnitId') },
		}),
		enabled: !!form.watch('fromUnitId'),
		select: (data) =>
			data?.data?.map((equipment) => ({
				label: `(${equipment.serialNumber}) ${equipment.equipmentId.name}`,
				value: equipment._id,
			})),
	})

	const columns: ColumnDef<{
		instanceId: string
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
			header: 'Tên',
			cell: ({ row }) => {
				const { data: equipments } = useQuery({
					...equipmentInstancesControllerSearchOptions({
						query: {
							limit: 1000000,
							page: 1,
						},
					}),
				})
				const name = equipments?.data?.find(
					(item) => item._id === row.original?.instanceId,
				)?.name

				return <div>{name}</div>
			},
		},
		{
			accessorKey: 'serial',
			header: 'Mã hiệu',
			cell: ({ row }) => {
				const { data: equipments } = useQuery({
					...equipmentInstancesControllerSearchOptions({
						query: { limit: 1000000, page: 1 },
					}),
				})
				const serial = equipments?.data?.find(
					(item) => item._id === row.original?.instanceId,
				)?.serialNumber

				return <div>{serial}</div>
			},
		},
		{
			accessorKey: 'quantity',
			header: 'Số lượng',
		},
		{
			accessorKey: 'notes',
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
								const componentList = (form.getValues('items') ?? []).filter(
									(item) => item.instanceId !== (original as any).instanceId,
								)
								form.setValue('items', componentList)
							}}
						>
							Xoá
						</div>
					</div>
				)
			},
		},
	]

	const handleSelectEquipment = () => {
		if (Number.isNaN(Number(form.watch('selectedEquipmentQuantity')))) {
			toast.error('Vui lòng nhập số lượng hợp lệ')
			return
		}
		const component = equipments?.find(
			(item) => item.value === form.watch('selectedEquipmentName'),
		)
		const componentList = (form.getValues('items') ?? []).filter(
			(item) => item.instanceId !== component?.value,
		)
		form.setValue('items', [
			...componentList,
			{
				instanceId: component?.value,
				componentName: component?.label,
				unitOfMeasure: 'Bộ',
				quantity: Number(form.watch('selectedEquipmentQuantity')),
				notes: form.watch('selectedEquipmentNote'),
			} as any,
		])
	}

	return (
		<div>
			<Card>
				<Form {...form}>
					<div className="grid gap-y-5 gap-x-20 grid-cols-2">
						<FormField
							control={control}
							name="reportNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số biên bản</FormLabel>
									<FormControl>
										<Input placeholder="Số biên bản" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div />
						<FormField
							control={control}
							name="fromUnitId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị</FormLabel>
									<FormControl>
										<Select
											value={value}
											onValueChange={(e) => {
												onChange(e)
												form.setValue('items', [])
												form.setValue('selectedEquipmentName', '')
												form.setValue('selectedEquipmentNote', '')
												form.setValue('selectedEquipmentQuantity', '')
											}}
										>
											<SelectTrigger
												className="w-full"
												onClear={() => onChange('')}
											>
												<SelectValue />
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
						<FormField
							control={control}
							name="repairLocation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nơi bảo dưỡng/sửa chữa</FormLabel>
									<FormControl>
										<Input placeholder="Nơi bảo dưỡng/sửa chữa" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="sentDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ngày gửi</FormLabel>
									<FormControl>
										<DatePicker
											value={new Date(field.value)}
											onChange={(e) => field.onChange(e.toString())}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="receivedDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ngày nhận</FormLabel>
									<FormControl>
										<DatePicker
											value={field.value ? new Date(field.value) : undefined}
											onChange={(e) => field.onChange(e.toString())}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="sender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Người gửi</FormLabel>
									<FormControl>
										<Input placeholder="Người gửi" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="receiver"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Người nhận</FormLabel>
									<FormControl>
										<Input placeholder="Người nhận" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="reason"
							render={({ field }) => (
								<div>
									<FormItem>
										<FormLabel>Lý do bảo dưỡng/sửa chữa</FormLabel>
										<FormControl>
											<Input
												placeholder="Lý do bảo dưỡng/sửa chữa"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								</div>
							)}
						/>
						<FormField
							control={control}
							name="notes"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ghi chú</FormLabel>
									<FormControl>
										<Textarea placeholder="Ghi chú" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex gap-x-5 items-center mt-10">
						<FormField
							control={form.control}
							name="items"
							render={({ field: { value } }) => (
								<FormItem className="mt-5">
									<FormLabel>Trang bị</FormLabel>
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
							onClick={handleSelectEquipment}
							disabled={
								!(
									form.watch('selectedEquipmentName') &&
									form.watch('selectedEquipmentQuantity')
								)
							}
						>
							<ArrowBigLeftDash className="size-7" />
						</Button>
						<Card className="h-full flex-grow min-w-96">
							<FormField
								control={control}
								name="selectedEquipmentName"
								render={({ field }) => (
									<FormItem className="flex w-full">
										<FormLabel className="flex-none w-24">Tên</FormLabel>
										<FormControl>
											<div className="w-full">
												<Combobox
													onChange={field.onChange}
													options={equipments || []}
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
								name="selectedEquipmentQuantity"
								render={({ field }) => (
									<FormItem className="flex w-full">
										<FormLabel className="flex-none w-24">Số lượng</FormLabel>
										<FormControl>
											<div className="w-full">
												<Input type="text" placeholder="Số lượng" {...field} />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="selectedEquipmentNote"
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
					{id && (
						<div className="grid gap-y-5 gap-x-20 grid-cols-2 mt-10">
							<FormField
								control={control}
								name="result"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Kết quả</FormLabel>
										<FormControl>
											<Input placeholder="Kết quả" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="comment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nhận xét</FormLabel>
										<FormControl>
											<Textarea placeholder="Nhận xét" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					)}
					<div className="mt-10 flex items-center justify-end gap-x-5">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								router.push(pageList.equipmentSetMaintenance.href)
							}}
						>
							Quay lại
						</Button>
						<Button onClick={form.handleSubmit(onSubmit)} disabled={isUpdating}>
							{isUpdating ? 'Đang xử lý...' : id ? 'Cập nhật' : 'Thêm'}
						</Button>
					</div>
				</Form>
			</Card>
		</div>
	)
}

export default MaintenanceDetailForm
