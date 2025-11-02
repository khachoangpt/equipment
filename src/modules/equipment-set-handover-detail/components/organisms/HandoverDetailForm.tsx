'use client'
import {
	equipmentInstancesControllerFindOneOptions,
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
import useHandoverDetailController from '../../controllers/handover-detail.controller'

type Props = {
	id?: string
}

const HandoverDetailForm = ({ id }: Props) => {
	const {
		form,
		onSubmit,
		isUpdating,
		validateEquipmentQuantities,
		isValidating,
	} = useHandoverDetailController(id)
	const { control } = form
	const router = useRouter()

	const { data: units } = useQuery({
		...unitsControllerFindAllOptions({ query: { limit: 1000000, page: 1 } }),
	})
	const { data: equipments } = useQuery({
		...equipmentInstancesControllerSearchOptions({
			query: {
				limit: 1000000,
				page: 1,
				importingUnitId: form.watch('fromUnitId'),
			},
		}),
		enabled: !!form.watch('fromUnitId'),
		select: (data) =>
			data?.data?.map((equipment) => ({
				label: `(${equipment.serialNumber}) ${equipment.equipmentId.name}`,
				value: equipment._id,
				name: equipment.equipmentId.name,
			})),
	})

	const handleSelectEquipment = async () => {
		const component = equipments?.find(
			(item) => item.value === form.watch('selectedEquipmentName'),
		)
		const quantity = Number(form.watch('selectedEquipmentQuantity'))

		if (!component) {
			toast.error('Vui lòng chọn trang bị')
			return
		}

		if (!quantity || quantity <= 0) {
			toast.error('Vui lòng nhập số lượng hợp lệ')
			return
		}

		// Create temporary items list for validation
		const componentList = (form.getValues('items') ?? []).filter(
			(item) => item.instanceId !== component?.value,
		)
		const tempItems = [
			...componentList,
			{
				instanceId: component?.value,
				componentName: component?.label,
				unitOfMeasure: 'Bộ',
				quantity: quantity,
				note: form.watch('selectedEquipmentNote'),
			} as any,
		]

		// Prepare form data for validation
		const formData = {
			...form.getValues(),
			items: tempItems,
		}

		try {
			// Validate quantities
			const validationResult = (await validateEquipmentQuantities(
				formData,
			)) as any

			if (validationResult?.isValid === false) {
				// Show validation errors
				if (validationResult.errors && validationResult.errors.length > 0) {
					for (const error of validationResult.errors) {
						toast.error(error)
					}
					return
				}
			}

			// Show warnings if any
			if (validationResult?.warnings && validationResult.warnings.length > 0) {
				for (const warning of validationResult.warnings) {
					toast.warning(warning)
				}
			}

			// If validation passes, add equipment to list
			form.setValue('items', tempItems)

			// Clear selection fields
			form.setValue('selectedEquipmentName', '')
			form.setValue('selectedEquipmentQuantity', '')
			form.setValue('selectedEquipmentNote', '')

			toast.success('Đã thêm trang bị vào danh sách bàn giao')
		} catch (error) {
			console.error('Validation error:', error)
			toast.error('Có lỗi xảy ra khi kiểm tra số lượng trang bị')
		}
	}

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
					...equipmentInstancesControllerFindOneOptions({
						path: { id: row.original?.instanceId },
					}),
					enabled: !!row.original?.instanceId,
				})

				return <div>{equipments?.equipmentId?.name}</div>
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
							name="handoverDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ngày giao</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => field.onChange(e.toString())}
											value={field.value ? new Date(field.value) : new Date()}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div />
						<FormField
							control={control}
							name="sender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Người giao</FormLabel>
									<FormControl>
										<Input placeholder="Người giao" {...field} />
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
							name="fromUnitId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị giao</FormLabel>
									<FormControl>
										<Select
											value={value}
											onValueChange={(value) => {
												onChange(value)
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
							name="toUnitId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị nhận</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
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
						{/* <FormField
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
						/> */}
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
								) || isValidating
							}
						>
							{isValidating ? (
								'Đang kiểm tra...'
							) : (
								<ArrowBigLeftDash className="size-7" />
							)}
						</Button>
						<Card className="h-full flex-none">
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
													value={field.value || ''}
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
					<div className="mt-10 flex items-center justify-end gap-x-5">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								router.push(pageList.equipmentSetHandover.href)
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

export default HandoverDetailForm
