'use client'

import {
	activityLogsControllerSearchQueryKey,
	equipmentInstancesControllerDisposeMutation,
	equipmentInstancesControllerSearchOptions,
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
import type { CreateEquipmentDisposalSchema } from '@/configs/schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import useLiquidationDetailController from '../../controllers/liquidation-detail.controller'

type Props = {
	id?: string
}

const LiquidationDetailForm = ({ id }: Props) => {
	const { form } = useLiquidationDetailController({ id })
	const { control } = form
	const router = useRouter()
	const { mutate: create } = useMutation({
		...equipmentInstancesControllerDisposeMutation(),
	})
	const { data: equipments } = useQuery({
		...equipmentInstancesControllerSearchOptions(),
		select: (data) =>
			data.map((equipment) => ({
				label: `(${equipment.serialNumber}) ${equipment.equipmentId.name}`,
				value: equipment._id,
			})),
	})

	const onSubmit: SubmitHandler<CreateEquipmentDisposalSchema> = (data) => {
		create(
			{
				path: { id: data.equipment },
				body: {
					createdBy: data.createdBy,
					decisionNumber: data.decisionNumber,
					disposalDate: new Date(data.disposalDate).toISOString(),
					signer: data.signer,
					notes: data.notes,
				},
			},
			{
				onError: () => {
					toast.error('Tạo không thành công')
				},
				onSuccess: () => {
					toast.success('Tạo thành công')
					queryClient.invalidateQueries({
						queryKey: activityLogsControllerSearchQueryKey({
							query: { activityType: 'Thanh lý' },
						}),
					})
					router.push(pageList.equipmentSetLiquidation.href)
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
						<FormField
							control={control}
							name="equipment"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Trang bị</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{equipments?.map((equipment) => (
													<SelectItem
														key={equipment.value}
														value={equipment.value}
													>
														{equipment.label}
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
											value={new Date(value || 0)}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="createdBy"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Người lập</FormLabel>
									<FormControl>
										<Input placeholder="Người lập" {...field} />
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
