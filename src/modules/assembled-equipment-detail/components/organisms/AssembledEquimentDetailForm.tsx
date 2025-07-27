'use client'

import type { CreateEquipmentInstanceDto } from '@/client'
import {
	assembledEquipmentControllerFindAllBuildActivitiesOptions,
	equipmentInstancesControllerCreateMutation,
	equipmentInstancesControllerUpdateMutation,
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
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import useAssembledEquipmentDetailController from '../../controllers/assembled-equipment-detail.controller'

type Props = {
	id?: string
}

const AssembledEquipmentDetailForm = ({ id }: Props) => {
	const { form } = useAssembledEquipmentDetailController({ id })
	const { data: units } = useQuery({
		...unitsControllerFindAllOptions(),
	})
	// const { data: typeGroups } = useQuery({
	// 	...equipmentGroupsControllerFindAllOptions({
	// 		query: { type: 'EQUIPMENT_GROUP' },
	// 	}),
	// })
	const { mutate: create } = useMutation({
		...equipmentInstancesControllerCreateMutation(),
	})
	const { mutate: update } = useMutation({
		...equipmentInstancesControllerUpdateMutation(),
	})
	const { data: buildActivities } = useQuery({
		...assembledEquipmentControllerFindAllBuildActivitiesOptions({
			query: { limit: 1000000, page: 1 },
		}),
		select: (data: any) => {
			return data?.data?.map((e: any) => ({
				value: e?.config?._id,
				label: e?.config?.name,
				...e,
			}))
		},
	})

	const router = useRouter()

	const onSubmit: SubmitHandler<CreateEquipmentInstanceDto> = async (data) => {
		if (!id) {
			create(
				{
					body: {
						...data,
						type: 'ASSEMBLED_EQUIPMENT',
						productionDate: data.productionDate
							? new Date(data.productionDate).toISOString()
							: undefined,
						quantity: Number(data.quantity),
					},
				},
				{
					onError: (error) => {
						toast.error((error.response?.data as any)?.message)
					},
					onSuccess: () => {
						toast.success('Tạo trang bị thành công')
						router.push(pageList.assembledEquipment.href)
					},
				},
			)
		} else {
			update(
				{
					path: { id },
					body: {
						...data,
						type: 'ASSEMBLED_EQUIPMENT',
						productionDate: data.productionDate
							? new Date(data.productionDate).toISOString()
							: undefined,
						quantity: Number(data.quantity),
					},
				},
				{
					onError: (error) => {
						toast.error((error.response?.data as any)?.message)
					},
					onSuccess: () => {
						toast.success('Cập nhật trang bị thành công')
						router.push(pageList.assembledEquipment.href)
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
						{/* <FormField
							control={form.control}
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
							control={form.control}
							name="buildActivityId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Tên trang bị</FormLabel>
									<FormControl>
										<Combobox
											options={buildActivities || []}
											value={value}
											onChange={(value) => {
												onChange(value)
												const buildFound = buildActivities?.find(
													(e: any) => e.value === value,
												)
												form.setValue('name', buildFound?.config?.name)
												form.setValue(
													'equipmentId',
													buildFound?.config?.equipmentId,
												)
												form.setValue(
													'unitOfMeasure',
													buildFound?.config?.unitOfMeasure,
												)
												form.setValue('quantity', buildFound?.quantity)
											}}
										/>
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
							name="productionDate"
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
							name="importingUnitId"
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
							name="usingUnitId"
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
								name="evaluatingUnitId"
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
							name="evaluationResult"
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
								router.push(pageList.assembledEquipment.href)
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

export default AssembledEquipmentDetailForm
