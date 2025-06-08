'use client'

import {
	categoriesControllerFindAllOptions,
	organizationControllerFindAllUnitsOptions,
	syncEquipmentControllerCreateMutation,
	syncEquipmentControllerFindAllQueryKey,
	syncEquipmentControllerUpdateMutation,
} from '@/client/@tanstack/react-query.gen'
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
		...syncEquipmentControllerCreateMutation(),
	})
	const { mutate: update } = useMutation({
		...syncEquipmentControllerUpdateMutation(),
	})
	const { data: units } = useQuery({
		...organizationControllerFindAllUnitsOptions(),
	})

	const onSubmit = (data: any) => {
		if (!id) {
			create(
				{
					body: {
						name: data?.name ?? '',
						serialNumber: data?.serialNumber ?? '',
						currentUnitId: data?.currentUnit ?? '',
						groupId: data?.group ?? '',
						qualityLevelId: data?.quality ?? '',
						status: data?.status ?? '',
						initialPrice: data?.initialPrice ?? 0,
					},
				},
				{
					onSuccess: () => {
						router.push(pageList.equipmentSet.href)
						queryClient.invalidateQueries({
							queryKey: syncEquipmentControllerFindAllQueryKey(),
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
						name: data?.name ?? '',
						serialNumber: data?.serialNumber ?? '',
						currentUnitId: data?.currentUnit ?? '',
						groupId: data?.group ?? '',
						qualityLevelId: data?.quality ?? '',
						status: data?.status ?? '',
						initialPrice: data?.initialPrice ?? 0,
					},
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: syncEquipmentControllerFindAllQueryKey(),
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
		...categoriesControllerFindAllOptions({ query: { type: 'QUALITY_LEVEL' } }),
	})
	const { data: equipmentSetTypeGroups } = useQuery({
		...categoriesControllerFindAllOptions({
			query: { type: 'EQUIPMENT_GROUP' },
		}),
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
							name="initialPrice"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Giá tiền</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Giá tiền"
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
							name="currentUnit"
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Đơn vị nhập</FormLabel>
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
												{((quantityList as any) ?? [])?.map((quantity: any) => (
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
							name="group"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Nhóm loại</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{((equipmentSetTypeGroups as any) ?? []).map(
													(type: any) => (
														<SelectItem key={type._id} value={type._id}>
															{type.name}
														</SelectItem>
													),
												)}
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
