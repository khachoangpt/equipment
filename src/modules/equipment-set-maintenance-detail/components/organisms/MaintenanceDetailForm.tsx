'use client'

import {
	activityLogsControllerSearchQueryKey,
	equipmentInstancesControllerSearchOptions,
	equipmentRepairControllerRepairMutation,
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
import type { CreateEquipmentMaintenanceSchema } from '@/configs/schema'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowBigLeftDash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import useMaintenanceDetailController from '../../controllers/maintenance-detail.controller'

type Props = {
	id?: string
}

const MaintenanceDetailForm = ({ id }: Props) => {
	const { form } = useMaintenanceDetailController({ id })
	const { control } = form
	const router = useRouter()
	const { mutate: create } = useMutation({
		...equipmentRepairControllerRepairMutation(),
	})
	const { data: units } = useQuery({
		...unitsControllerFindAllOptions({ query: { limit: 1000000, page: 1 } }),
	})
	const { data: equipments } = useQuery({
		...equipmentInstancesControllerSearchOptions({
			query: { limit: 1000000, page: 1 },
		}),
		select: (data) =>
			data?.data?.map((equipment) => ({
				label: `(${equipment.serialNumber}) ${equipment.equipmentId.name}`,
				value: equipment._id,
			})),
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
			header: 'Tên',
		},
		// {
		// 	accessorKey: 'unitOfMeasure',
		// 	header: 'Đơn vị tính',
		// },
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
				note: form.watch('selectedEquipmentNote'),
			} as any,
		])
	}

	const onSubmit: SubmitHandler<CreateEquipmentMaintenanceSchema> = (data) => {
		create(
			{
				body: {
					fromUnitId: data.fromUnitId as any,
					items: (data.items || []) as any,
					reason: data.reason,
					repairDate: new Date(data.sentDate).toISOString(),
					receivedDate: data.receivedDate
						? new Date(data.receivedDate).toISOString()
						: undefined,
					reportNumber: data.reportNumber,
					receiver: data.receiver,
					sender: data.sender,
					comment: data.comment,
					notes: data.notes,
					repairLocation: data.repairLocation,
					type: 'repair',
					repairResult: data.result,
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
					toast.success('Tạo thành công')
					queryClient.invalidateQueries({
						queryKey: activityLogsControllerSearchQueryKey({
							query: { activityType: 'Sửa chữa' },
						}),
					})
					router.push(pageList.equipmentSetMaintenance.href)
				},
			},
		)
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
						<FormField
							control={control}
							name="fromUnitId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
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
											value={new Date(field.value || '')}
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
								<FormItem>
									<FormLabel>Lý do bảo dưỡng/sửa chữa</FormLabel>
									<FormControl>
										<Input placeholder="Lý do bảo dưỡng/sửa chữa" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<Card className="h-full w-1/3 flex-none">
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
						<Button onClick={form.handleSubmit(onSubmit)}>
							{id ? 'Cập nhật' : 'Thêm'}
						</Button>
					</div>
				</Form>
			</Card>
		</div>
	)
}

export default MaintenanceDetailForm
