'use client'

import {
	equipmentGroupsControllerFindAllOptions,
	equipmentsControllerCreateMutation,
	equipmentsControllerFindAllQueryKey,
	equipmentsControllerUpdateMutation,
	qualityLevelsControllerFindAllOptions,
} from '@/client/@tanstack/react-query.gen'
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
import { toast } from 'sonner'
import useEquipmentSetDetailController from '../../controllers/equipment-set-detail.controller'

type Props = {
	id?: string
}

const EquipmentSetDetailForm = ({ id }: Props) => {
	const router = useRouter()
	const { form } = useEquipmentSetDetailController({ id })
	const { mutate: create } = useMutation({
		...equipmentsControllerCreateMutation(),
	})
	const { mutate: update } = useMutation({
		...equipmentsControllerUpdateMutation(),
	})

	const onSubmit = (data: EquipmentSetDetailSchema) => {
		if (!id) {
			create(
				{
					body: {
						code: data?.serial ?? '',
						name: data?.name ?? '',
						groupId: data?.typeGroup ?? '',
						entryDate: data?.importDate ?? '',
						mainUnitId: '',
						qualityLevelId: data?.quality ?? '',
						serialNumber: data?.serial ?? '',
						status: data?.status ?? '',
						accompanyingComponents: [],
						currentUnitId: data?.usedUnit ?? '',
						currentValue: data?.amount ?? 0,
						description: '',
						entryPlanNumber: data?.importPlanNumber.toString() ?? '',
						initialValue: 0,
						originCountry: '',
						productionDate: data?.manufacturingDate ?? '',
						supplySource: data?.origin ?? '',
						evaluatingUnitId: data?.rateUnit ?? '',
						evaluationResult: data?.rateResult ?? '',
					},
				},
				{
					onSuccess: () => {
						router.push(pageList.equipmentSet.href)
						queryClient.invalidateQueries({
							queryKey: equipmentsControllerFindAllQueryKey(),
						})
					},
					onError: () => {
						toast.error('Tạo trang bị không thành công')
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
						code: data?.serial ?? '',
						name: data?.name ?? '',
						groupId: data?.typeGroup ?? '',
						entryDate: data?.importDate ?? '',
						mainUnitId: '',
						qualityLevelId: data?.quality ?? '',
						serialNumber: data?.serial ?? '',
						status: data?.status ?? '',
						accompanyingComponents: [],
						currentUnitId: data?.usedUnit ?? '',
						currentValue: data?.amount ?? 0,
						description: '',
						entryPlanNumber: data?.importPlanNumber.toString() ?? '',
						initialValue: 0,
						originCountry: '',
						productionDate: data?.manufacturingDate ?? '',
						supplySource: data?.origin ?? '',
						evaluatingUnitId: data?.rateUnit ?? '',
						evaluationResult: data?.rateResult ?? '',
					},
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: equipmentsControllerFindAllQueryKey(),
						})
						router.push(pageList.equipmentSet.href)
					},
					onError: () => {
						toast.error('Cập nhật trang bị không thành công')
					},
				},
			)
		}
	}
	const { data: quantityList } = useQuery({
		...qualityLevelsControllerFindAllOptions(),
	})
	const { data: equipmentSetTypeGroups } = useQuery({
		...equipmentGroupsControllerFindAllOptions(),
	})

	return (
		<div>
			<Card>
				<Form {...form}>
					<div className="grid gap-y-5 gap-x-20 grid-cols-2">
						<FormField
							control={form.control}
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
						<FormField
							control={form.control}
							name="serial"
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
							name="importDate"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Ngày nhập</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => onChange(e.toString())}
											value={new Date(value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="importPlanNumber"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Số kế hoạch nhập</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Số kế hoạch nhập"
											onChange={(e) => onChange(Number(e.target.value))}
											value={value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="origin"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nguồn cấp</FormLabel>
									<FormControl>
										<Input placeholder="Nguồn cấp" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Giá tiền hiện tại</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Giá tiền hiện tại"
											value={value}
											onChange={(e) => onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="manufacturingDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ngày sản xuất</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => field.onChange(e.toString())}
											value={new Date(field.value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="importUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đơn vị nhập</FormLabel>
									<FormControl>
										<Input placeholder="Đơn vị nhập" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="rateUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đơn vị đánh giá</FormLabel>
									<FormControl>
										<Input placeholder="Đơn vị đánh giá" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="rateResult"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Kết quả đánh giá</FormLabel>
									<FormControl>
										<Input placeholder="Kết quả đánh giá" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="usedUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đơn vị sử dụng</FormLabel>
									<FormControl>
										<Input placeholder="Đơn vị sử dụng" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="quality"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Phân cấp chất lượng</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{(quantityList ?? []).map((quantity) => (
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
							name="typeGroup"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Nhóm loại</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{(equipmentSetTypeGroups ?? []).map((type) => (
													<SelectItem key={type._id} value={type._id}>
														{type.name}
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
