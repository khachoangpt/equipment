'use client'

import {
	assembledEquipmentControllerCheckBuildAvailabilityMutation,
	assembledEquipmentControllerFindAllConfigsOptions,
	unitsControllerFindAllOptions,
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
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useAssembledEquipmentBuildController from '../../controllers/assembled-equipment-build.controller'

type Props = {
	id?: string
}

const AssembledEquipmentBuildForm = ({ id }: Props) => {
	const { form, onSubmit } = useAssembledEquipmentBuildController({ id })
	const { control } = form
	const router = useRouter()
	// const { data: typeGroups } = useQuery({
	// 	...equipmentGroupsControllerFindAllOptions({
	// 		query: { type: 'EQUIPMENT_GROUP' },
	// 	}),
	// })
	const { data: configs } = useQuery({
		...assembledEquipmentControllerFindAllConfigsOptions({
			query: { limit: 1000000, page: 1 },
		}),
	})

	const { data: units } = useQuery({
		...unitsControllerFindAllOptions({
			query: { limit: 1000000, page: 1 },
		}),
	})
	const { mutate: checkBuild } = useMutation({
		...assembledEquipmentControllerCheckBuildAvailabilityMutation(),
	})

	const columns: ColumnDef<{
		index: number
		componentName: string
		unitOfMeasure: string
		quantity: number
		lackQuantity: number
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
			accessorKey: 'lackQuantity',
			header: 'Thiếu vật tư/linh kiện',
		},
	]

	useEffect(() => {
		const equipmentId = form.watch('equipmentId')
		if (equipmentId) {
			const config = (configs as any)?.find(
				(item: any) => item.equipmentId === equipmentId,
			)

			if (config) {
				form.setValue('configId', config?._id)

				if (form.watch('equipmentId')) {
					checkBuild(
						{
							body: {
								configId: config?._id,
								quantityToBuild: Number(form.watch('quantity')),
							},
						},
						{
							onSuccess: (data: any) => {
								const details = data?.details

								if (details?.length > 0) {
									form.setValue(
										'componentList',
										config?.componentList?.map((item: any) => {
											const detail = details?.find(
												(detail: any) =>
													detail?.componentId === item?.component?._id,
											)

											return {
												componentId: detail?._id,
												componentName: detail?.componentName,
												unitOfMeasure: detail?.unitOfMeasure,
												quantity: detail?.requiredQuantity,
												note: detail?.note,
												lackQuantity: detail?.shortage,
											}
										}),
									)
								}
							},
						},
					)
				}
			}
		}
	}, [form.watch('equipmentId'), form.watch('quantity')])

	return (
		<div>
			<Card>
				<Form {...form}>
					<div className="grid gap-y-5 gap-x-20 grid-cols-2">
						{/* <FormField
							control={control}
							name="equipmentId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Danh mục</FormLabel>
									<FormControl>
										<Combobox
											options={(typeGroups || []).map((e) => ({
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
						<div /> */}
						<FormField
							control={control}
							name="equipmentId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Tên trang bị</FormLabel>
									<FormControl>
										<Combobox
											options={(configs?.data || []).map((e: any) => ({
												value: e.equipmentId,
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
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số lượng</FormLabel>
									<FormControl>
										<Input type="text" placeholder="Số lượng" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div />
						<FormField
							control={control}
							name="buildingUnitId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị xây dựng</FormLabel>
									<FormControl>
										<Select key={value} value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Đơn vị xây dựng" />
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
					</div>
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

					<div className="mt-10 flex items-center justify-end gap-x-5">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								router.push(pageList.assembledEquipmentBuild.href)
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

export default AssembledEquipmentBuildForm
