'use client'

import {
	organizationControllerFindAllUnitsOptions,
	syncEquipmentControllerFindAllOptions,
	syncEquipmentControllerGetLiquidationLogsOptions,
	syncEquipmentControllerLiquidateMutation,
	userControllerGetAllOptions,
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
import { MultiSelect } from '@/components/ui/multi-select'
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
import useLiquidationDetailController from '../../controllers/liquidation-detail.controller'

type Props = {
	id?: string
}

const LiquidationDetailForm = ({ id }: Props) => {
	const { form } = useLiquidationDetailController({ id })
	const { control } = form
	const router = useRouter()
	const { mutate: create } = useMutation({
		...syncEquipmentControllerLiquidateMutation(),
	})
	const { data: units } = useQuery({
		...organizationControllerFindAllUnitsOptions(),
	})
	const { data: users } = useQuery({
		...userControllerGetAllOptions(),
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
					decisionNumber: data.decisionNumber,
					equipmentIds: data.equipmentList,
					liquidationDate: new Date(data.liquidationDate).toISOString(),
					unitId: data.unit,
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
						queryKey:
							syncEquipmentControllerGetLiquidationLogsOptions().queryKey,
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
							name="equipmentList"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Trang bị</FormLabel>
									<FormControl>
										<MultiSelect
											defaultValue={value}
											options={(equipments as any) ?? []}
											onValueChange={onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="unit"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{((units as any) ?? [])?.map((quantity: any) => (
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
							control={control}
							name="liquidationDate"
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
							name="creator"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Người tạo</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{((users as any) ?? [])?.map((quantity: any) => (
													<SelectItem key={quantity._id} value={quantity._id}>
														{quantity.firstName}
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
