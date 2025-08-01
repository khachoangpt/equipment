'use client'

import {
	activityLogsControllerSearchQueryKey,
	equipmentInstancesControllerRepairMutation,
	equipmentInstancesControllerSearchOptions,
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
import {} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import type { CreateEquipmentMaintenanceSchema } from '@/configs/schema'
import { useMutation, useQuery } from '@tanstack/react-query'
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
		...equipmentInstancesControllerRepairMutation(),
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

	const onSubmit: SubmitHandler<CreateEquipmentMaintenanceSchema> = (data) => {
		create(
			{
				path: { id: data.equipment },
				body: {
					reason: data.reason,
					repairLocation: data.repairLocation,
					reportNumber: data.reportNumber,
					sender: data.sender,
					sentDate: new Date(data.sentDate).toISOString(),
					receivedDate: data.receivedDate
						? new Date(data.receivedDate).toISOString()
						: undefined,
					receiver: data.receiver,
					notes: data.notes,
					result: data.result,
					comment: data.comment,
				},
			},
			{
				onError: (error) => {
					toast.error((error.response?.data as any)?.message)
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
							name="equipment"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Trang bị</FormLabel>
									<FormControl>
										<Combobox
											options={equipments || []}
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
