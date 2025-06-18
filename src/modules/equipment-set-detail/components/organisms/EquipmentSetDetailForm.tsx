'use client'

import {
	equipmentInstancesControllerCreateMutation,
	equipmentInstancesControllerSearchQueryKey,
	equipmentInstancesControllerUpdateMutation,
	qualityLevelsControllerFindAllOptions,
	syncEquipmentControllerFindAllOptions,
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
} from '@/components/ui/select'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import type { EquipmentSetDetailSchema } from '@/configs/schema'
import { SelectValue } from '@radix-ui/react-select'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import useEquipmentSetDetailController from '../../controllers/equipment-set-detail.controller'

type Props = {
	id?: string
}

const EquipmentSetDetailForm = ({ id }: Props) => {
	const router = useRouter()
	const { form } = useEquipmentSetDetailController({ id })
	const { mutate: create } = useMutation({
		...equipmentInstancesControllerCreateMutation(),
	})
	const { data: syncEquipments } = useQuery({
		...syncEquipmentControllerFindAllOptions(),
	})
	const { mutate: update } = useMutation({
		...equipmentInstancesControllerUpdateMutation(),
	})
	const { data: units } = useQuery({
		...unitsControllerFindAllOptions(),
	})
	const { data: quantityList } = useQuery({
		...qualityLevelsControllerFindAllOptions(),
	})

	const onSubmit: SubmitHandler<EquipmentSetDetailSchema> = (data) => {
		if (!id) {
			create(
				{
					body: {
						...data,
						evaluatingUnitId: data.evaluatingUnitId
							? data.evaluatingUnitId
							: undefined,
						usingUnitId: data.usingUnitId ? data.usingUnitId : undefined,
						quantity: data.quantity ? data.quantity : 0,
					},
				},
				{
					onSuccess: () => {
						toast.success('Tạo thành công')
						router.push(pageList.equipmentSet.href)
						queryClient.invalidateQueries({
							queryKey: equipmentInstancesControllerSearchQueryKey(),
						})
					},
					onError: () => {
						toast.error('Tạo không thành công')
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
						...data,
						evaluatingUnitId: data.evaluatingUnitId
							? data.evaluatingUnitId
							: undefined,
						usingUnitId: data.usingUnitId ? data.usingUnitId : undefined,
					},
				},
				{
					onSuccess: () => {
						toast.success('Cập nhật thành công')
						queryClient.invalidateQueries({
							queryKey: equipmentInstancesControllerSearchQueryKey(),
						})
						router.push(pageList.equipmentSet.href)
					},
					onError: () => {
						toast.error('Cập nhật không thành công')
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
							name="equipmentId"
							render={({ field: { onChange, value } }) => (
								<FormItem key={value}>
									<FormLabel>Loại trang bị</FormLabel>
									<FormControl>
										{/* <Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Loại trang bị" />
											</SelectTrigger>
											<SelectContent>
												{syncEquipments?.map((equipment) => (
													<SelectItem key={equipment._id} value={equipment._id}>
														{equipment.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select> */}
										<Combobox
											options={(syncEquipments || []).map((e) => ({
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
						<FormField
							control={form.control}
							name="serialNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mã hiệu serial</FormLabel>
									<FormControl>
										<Input placeholder="Mã hiệu serial" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="entryPlanNumber"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Số kế hoạch nhập</FormLabel>
									<FormControl>
										<Input
											placeholder="Số kế hoạch nhập"
											value={value}
											onChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="supplySource"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Nguồn cấp</FormLabel>
									<FormControl>
										<Input
											placeholder="Nguồn cấp"
											value={value}
											onChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="currentPrice"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Giá tiền hiện tại</FormLabel>
									<FormControl>
										<Input
											placeholder="Giá tiền hiện tại"
											value={value}
											onChange={(e) => {
												if (Number.isNaN(Number(e.target.value))) return
												onChange(Number(e.target.value))
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="entryDate"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Ngày nhập</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => onChange(e.toISOString())}
											value={new Date(value ?? '')}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="productionDate"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Ngày sản xuất</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => onChange(e.toISOString())}
											value={value ? new Date(value ?? '') : undefined}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="importingUnitId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị nhập</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{units?.map((quantity: any) => (
													<SelectItem key={quantity._id} value={quantity._id}>
														{quantity.name}
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
							control={form.control}
							name="evaluatingUnitId"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị đánh giá</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{units?.map((quantity: any) => (
													<SelectItem key={quantity._id} value={quantity._id}>
														{quantity.name}
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
							control={form.control}
							name="evaluationResult"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Kết quả đánh giá</FormLabel>
									<FormControl>
										<Input
											placeholder="Kết quả đánh giá"
											value={value}
											onChange={onChange}
										/>
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
									<FormLabel>Đơn vị sử dụng</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{units?.map((unit: any) => (
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
							control={form.control}
							name="qualityLevelId"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Phân cấp chất lượng</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{quantityList?.map((quantity: any) => (
													<SelectItem key={quantity._id} value={quantity._id}>
														{quantity.name}
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
							control={form.control}
							name="quantity"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Số lượng</FormLabel>
									<FormControl>
										<Input
											placeholder="Số lượng"
											value={value}
											onChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tình trạng trang bị</FormLabel>
									<FormControl>
										<Input placeholder="Tình trạng trang bị" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="mt-10 flex items-center justify-end gap-x-5">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								router.push(pageList.equipmentSet.href)
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

export default EquipmentSetDetailForm
