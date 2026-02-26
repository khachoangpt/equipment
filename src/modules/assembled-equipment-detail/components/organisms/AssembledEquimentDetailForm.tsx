'use client'

import type { CreateEquipmentInstanceDto } from '@/client'
import {
	equipmentInstancesControllerCreateMutation,
	equipmentInstancesControllerUpdateMutation,
	unitsControllerFindAllOptions,
} from '@/client/@tanstack/react-query.gen'
import axiosInstance from '@/configs/axios'
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
	mode: 'create' | 'update' | 'detail'
}

const AssembledEquipmentDetailForm = ({ id, mode = 'create' }: Props) => {
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
	// Lấy danh sách từ build-activity-summary API
	const { data: buildActivities } = useQuery({
		queryKey: ['build-activities-summary', { limit: 1000000, page: 1 }],
		queryFn: async () => {
			const response = await axiosInstance.get(
				'/api/v1/assembly-equipments/build-activities-summary',
				{
					params: {
						limit: 1000000,
						page: 1,
					},
				},
			)
			return response.data
		},
		select: (data) => {
			return data?.data?.map((e: any) => ({
				value: (e as any)?._id,
				label: (e?.config as any)?.name,
				config: e?.config as any,
				quantity: e?.totalQuantity || 0, // Dùng totalQuantity từ summary
				totalQuantity: e?.totalQuantity || 0,
				...e,
			}))
		},
	})

	const router = useRouter()

	const onSubmit: SubmitHandler<CreateEquipmentInstanceDto> = async (data) => {
		// Chuẩn bị body, loại bỏ buildActivityId nếu có buildActivitySummaryId
		const body: any = {
			...data,
			type: 'ASSEMBLED_EQUIPMENT',
			productionDate: data.productionDate
				? new Date(data.productionDate).toISOString()
				: undefined,
			quantity: Number(data.quantity),
			evaluatingUnitId: data.evaluatingUnitId
				? data.evaluatingUnitId
				: undefined,
			evaluationResult: data.evaluationResult
				? data.evaluationResult
				: undefined,
			usingUnitId: data.usingUnitId ? data.usingUnitId : undefined,
		}

		// Nếu có buildActivitySummaryId thì không gửi buildActivityId
		if (body.buildActivitySummaryId) {
			delete body.buildActivityId
		}

		if (!id) {
			create(
				{
					body,
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
					onSuccess: (response) => {
						// Kiểm tra xem có phải là update quantity không (dựa vào response hoặc logic)
						// Nếu instance đã tồn tại, backend sẽ return instance đã update
						// Có thể check quantity trong response để xác định
						const message =
							response?.quantity && response?.quantity > data.quantity
								? `Tăng số lượng trang bị thành công (Số lượng mới: ${response.quantity})`
								: 'Tạo trang bị thành công'
						toast.success(message)
						router.push(pageList.assembledEquipment.href)
					},
				},
			)
		} else {
			update(
				{
					path: { id },
					body,
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
							name="buildActivitySummaryId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Tên trang bị</FormLabel>
									<FormControl>
										{mode !== 'detail' ? (
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
													form.setValue('quantity', buildFound?.totalQuantity || buildFound?.quantity)
												}}
											/>
										) : (
											<span className="text-muted-foreground">
												{
													buildActivities?.find((e: any) => e.value === value)
														?.config?.name
												}
											</span>
										)}
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
										{mode !== 'detail' ? (
											<Input
												type="text"
												placeholder="Đơn vị tính"
												{...field}
												className="w-1/2"
											/>
										) : (
											<span className="text-muted-foreground">
												{field.value}
											</span>
										)}
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
										{mode !== 'detail' ? (
											<Input
												type="number"
												placeholder="Số lượng"
												{...field}
												className="w-1/2"
											/>
										) : (
											<span className="text-muted-foreground">
												{field.value}
											</span>
										)}
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
										{mode !== 'detail' ? (
											<DatePicker
												onChange={(e) => field.onChange(e.toISOString())}
												value={field.value ? new Date(field.value) : undefined}
											/>
										) : (
											<span className="text-muted-foreground">
												{new Date(field.value || '').toLocaleDateString(
													'vi-VN',
												)}
											</span>
										)}
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
										{mode !== 'detail' ? (
											<Select
												key={value}
												value={value}
												onValueChange={onChange}
											>
												<SelectTrigger
													className="w-full"
													clearable
													onClear={() => onChange('')}
												>
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
										) : (
											<span className="text-muted-foreground">
												{units?.data?.find((unit) => unit._id === value)?.name}
											</span>
										)}
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
									<FormLabel>Đơn vị nhận</FormLabel>
									<FormControl>
										{mode !== 'detail' ? (
											<Select
												key={value}
												value={value}
												onValueChange={onChange}
											>
												<SelectTrigger
													className="w-full"
													clearable
													onClear={() => onChange('')}
												>
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
										) : (
											<span className="text-muted-foreground">
												{units?.data?.find((unit) => unit._id === value)?.name}
											</span>
										)}
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<FormField
								control={form.control}
								name="evaluatingUnitId"
								render={({ field: { value, onChange } }) => (
									<FormItem>
										<FormLabel>Đơn vị đánh giá</FormLabel>
										<FormControl>
											{mode !== 'detail' ? (
												<Select
													key={value}
													value={value}
													onValueChange={onChange}
												>
													<SelectTrigger
														className="w-full"
														clearable
														onClear={() => onChange('')}
													>
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
											) : (
												<span className="text-muted-foreground">
													{
														units?.data?.find((unit) => unit._id === value)
															?.name
													}
												</span>
											)}
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
										{mode !== 'detail' ? (
											<Textarea placeholder="Nội dung đánh giá" {...field} />
										) : (
											<span className="text-muted-foreground">
												{field.value}
											</span>
										)}
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
										{mode !== 'detail' ? (
											<Input
												type="text"
												placeholder="Vị trí lưu trữ"
												{...field}
											/>
										) : (
											<span className="text-muted-foreground">
												{field.value}
											</span>
										)}
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
									{mode !== 'detail' ? (
										<Textarea
											placeholder="Ghi chú"
											className="w-2/3"
											{...field}
										/>
									) : (
										<span className="text-muted-foreground">{field.value}</span>
									)}
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{mode !== 'detail' && (
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
					)}
				</Form>
			</Card>
		</div>
	)
}

export default AssembledEquipmentDetailForm
