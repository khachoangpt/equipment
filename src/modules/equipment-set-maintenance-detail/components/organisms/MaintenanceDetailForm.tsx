'use client'

import {
	syncEquipmentControllerFindAllOptions,
	syncEquipmentControllerGetMaintenanceLogsOptions,
	syncEquipmentControllerLogMaintenanceMutation,
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
	SelectValue,
} from '@/components/ui/select'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
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
		...syncEquipmentControllerLogMaintenanceMutation(),
	})
	const { data: equipments } = useQuery({
		...syncEquipmentControllerFindAllOptions(),
		select: (data: any) =>
			data.map((equipment: any) => ({
				label: equipment.name,
				value: equipment._id,
			})),
	})

	const onSubmit = (data: any) => {
		create(
			{
				body: {
					equipment: data.equipmentId,
					location: data.location,
					sendDate: new Date(data.sendDate).toISOString(),
					receiveDate: new Date(data.receiveDate).toISOString(),
					reason: data.reason,
					result: data.result,
					notes: data.notes,
					voucherNumber: data.voucherNumber,
				},
			},
			{
				onError: () => {
					toast.error('Tạo không thành công')
				},
				onSuccess: () => {
					toast.success('Tạo thành công')
					queryClient.invalidateQueries({
						queryKey:
							syncEquipmentControllerGetMaintenanceLogsOptions().queryKey,
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
							name="voucherNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số phiếu</FormLabel>
									<FormControl>
										<Input placeholder="Số phiếu" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="equipmentId"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Trang bị</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{((equipments as any) ?? [])?.map((quantity: any) => (
													<SelectItem
														key={quantity.value}
														value={quantity.value}
													>
														{quantity.label}
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
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Địa điểm</FormLabel>
									<FormControl>
										<Input placeholder="Địa điểm" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="sendDate"
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
							name="receiveDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ngày nhận</FormLabel>
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
							name="reason"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lý do</FormLabel>
									<FormControl>
										<Input placeholder="Lý do" {...field} />
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
									<FormLabel>Kết qu </FormLabel>
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
										<Input placeholder="Ghi chú" {...field} />
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

export default MaintenanceDetailForm
