'use client'

import {
	organizationControllerFindAllUnitsOptions,
	syncEquipmentControllerFindAllOptions,
	syncEquipmentControllerHandoverMutation,
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
import useHandoverDetailController from '../../controllers/handover-detail.controller'

type Props = {
	id?: string
}

const HandoverDetailForm = ({ id }: Props) => {
	const { form } = useHandoverDetailController({ id })
	const { control } = form
	const router = useRouter()
	const { mutate: create } = useMutation({
		...syncEquipmentControllerHandoverMutation(),
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
					voucherNumber: data?.code,
					fromUnitId: data?.handoverUnit,
					toUnitId: data?.receiverUnit,
					receiverId: data?.receiverPerson,
					handoverDate: new Date(data?.handoverDate).toISOString(),
					equipmentIds: form.getValues()?.equipmentIds,
				},
			},
			{
				onError: () => {
					toast.error('Tạo không thành công')
				},
				onSuccess: () => {
					toast.success('Tạo bàn giao thành công')
					queryClient.invalidateQueries({
						queryKey: syncEquipmentControllerFindAllOptions().queryKey,
					})
					router.push(pageList.equipmentSetHandover.href)
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
							name="code"
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
							name="receiverPerson"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Người nhận</FormLabel>
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
							name="handoverUnit"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Đơn vị giao</FormLabel>
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
							name="receiverUnit"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị nhận</FormLabel>
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
							name="handoverDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ngày giao</FormLabel>
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
							control={control}
							name="equipmentIds"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Trang bị</FormLabel>
									<FormControl>
										<MultiSelect
											defaultValue={field.value}
											options={(equipments as any) ?? []}
											onValueChange={field.onChange}
										/>
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

export default HandoverDetailForm
