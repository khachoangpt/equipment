'use client'

import type { CreateEquipmentDisposeDto } from '@/client'
import {
	equipmentDisposeControllerDisposeMutation,
	equipmentDisposeControllerFindByDecisionNumberOptions,
	equipmentDisposeControllerSearchQueryKey,
	equipmentDisposeControllerUpdateMutation,
	equipmentInstancesControllerSearchOptions,
	unitsControllerFindAllOptions,
	usersControllerFindAllOptions,
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
import type { CreateEquipmentDisposalSchema } from '@/configs/schema'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowBigLeftDash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import useLiquidationDetailController from '../../controllers/liquidation-detail.controller'

type Props = {
	id?: string
}

const LiquidationDetailForm = ({ id }: Props) => {
	const { form } = useLiquidationDetailController({ id })
	const { data: liquidationData } = useQuery({
		...equipmentDisposeControllerFindByDecisionNumberOptions({
			path: { decisionNumber: id || '' },
		}),
		enabled: Boolean(id),
	})
	const { control } = form
	const router = useRouter()
	const { mutate: create } = useMutation({
		...equipmentDisposeControllerDisposeMutation(),
	})
	const { mutate: update } = useMutation({
		...equipmentDisposeControllerUpdateMutation(),
	})
	const { data: units } = useQuery({
		...unitsControllerFindAllOptions({ query: { limit: 1000000, page: 1 } }),
	})
	const { data: equipments } = useQuery({
		...equipmentInstancesControllerSearchOptions({
			query: { limit: 1000000, page: 1 },
		}),
		select: (data) => {
			return data?.data?.map((equipment) => ({
				label: `(${equipment.serialNumber}) ${equipment.equipmentId.name}`,
				value: equipment._id,
				name: equipment.equipmentId.name,
				serialNumber: equipment?.serialNumber,
			}))
		},
	})

	const { data: accounts } = useQuery({
		...usersControllerFindAllOptions({
			query: { limit: 1000000, page: 1 },
		}),
		select: (data) => {
			return data?.map((account) => ({
				label: account.fullName || account.username,
				value: account._id,
			}))
		},
	})

	const columns: ColumnDef<{
		instanceId: string
		serialNumber: string
		componentName: string
		unitOfMeasure: string
		quantity: number
		notes: string
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
		{
			accessorKey: 'serialNumber',
			header: 'Mã hiệu',
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
				serialNumber: component?.serialNumber,
				componentName: component?.name,
				unitOfMeasure: 'Bộ',
				quantity: Number(form.watch('selectedEquipmentQuantity')),
				notes: form.watch('selectedEquipmentNote'),
			} as any,
		])
	}

	const onSubmit: SubmitHandler<CreateEquipmentDisposalSchema> = (data) => {
		const submitData: CreateEquipmentDisposeDto = {
			decisionNumber: data.decisionNumber,
			disposalDate: new Date(data.disposalDate).toISOString(),
			fromUnitId: data.fromUnitId as any,
			items: (data.items || []) as any,
			signer: data.signer,
			type: 'disposal',
			approver: data.createdBy,
			notes: data.notes,
		}

		if (id) {
			update(
				{
					path: { id: liquidationData?._id || '' },
					body: submitData,
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
						queryClient.invalidateQueries({
							queryKey: equipmentDisposeControllerSearchQueryKey(),
						})
						router.push(pageList.equipmentSetLiquidation.href)
					},
				},
			)
		} else {
			create(
				{
					body: submitData,
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
							queryKey: equipmentDisposeControllerSearchQueryKey(),
						})
						router.push(pageList.equipmentSetLiquidation.href)
					},
				},
			)
		}
	}

	return (
		<div>
			<Card>
				<Form {...form}>
					<div className="grid gap-y-5 gap-x-20 grid-cols-2">
						<FormField
							control={control}
							name="decisionNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số quyết định</FormLabel>
									<FormControl>
										<Input placeholder="Số quyết định" {...field} />
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
						<FormField
							control={control}
							name="disposalDate"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Ngày thanh lý</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => onChange(e.toISOString())}
											value={value ? new Date(value || 0) : undefined}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="createdBy"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Người lập</FormLabel>
									<FormControl>
										<Combobox
											options={accounts || []}
											value={value}
											onChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="signer"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Người ký</FormLabel>
									<FormControl>
										<Input placeholder="Người ký" {...field} />
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
								router.push(pageList.equipmentSetLiquidation.href)
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

export default LiquidationDetailForm
