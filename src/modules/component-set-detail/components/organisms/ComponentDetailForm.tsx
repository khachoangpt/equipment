'use client'

import {
	componentsControllerCreateMutation,
	componentsControllerFindAllQueryKey,
	componentsControllerUpdateMutation,
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
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useComponentDetailController from '../../controllers/component-detail.controller'

type Props = {
	id?: string
}

const ComponentDetailForm = ({ id }: Props) => {
	const router = useRouter()
	const { form } = useComponentDetailController({ id })
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
					onSuccess: () => {
						toast.success('Tạo thành công')
						router.push(pageList.assembledEquipmentComponent.href)
						queryClient.invalidateQueries({
							queryKey: componentsControllerFindAllQueryKey(),
						})
					},
					onError: (error) => {
						toast.error((error.response?.data as any)?.message)
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
					},
				},
				{
					onSuccess: () => {
						toast.success('Cập nhật thành cong')
						queryClient.invalidateQueries({
							queryKey: componentsControllerFindAllQueryKey(),
						})
						router.push(pageList.assembledEquipmentComponent.href)
					},
					onError: (error) => {
						toast.error((error.response?.data as any)?.message)
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
					{/* <FormField
						control={form.control}
						name="files"
						render={({ field }) => (
							<FormItem className="mt-5">
								<FormLabel>Tài liệu</FormLabel>
								<FormControl>
									<Input
										type="file"
										placeholder="Tài liệu"
										className="w-1/2"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
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

export default ComponentDetailForm
