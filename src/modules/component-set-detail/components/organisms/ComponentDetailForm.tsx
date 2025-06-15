'use client'

import {
	componentsControllerCreateMutation,
	componentsControllerFindAllQueryKey,
	componentsControllerUpdateMutation,
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
import {} from '@/components/ui/select'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import { useMutation } from '@tanstack/react-query'
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

	const onSubmit = (data: any) => {
		if (!id) {
			create(
				{
					body: {
						name: data?.name ?? '',
						quantityInStock: Number(data?.quantityInStock) ?? 0,
						unitOfMeasure: data?.unitOfMeasure ?? '',
						storageLocation: data?.storageLocation ?? '',
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
						name: data?.name ?? '',
						quantityInStock: Number(data?.quantityInStock) ?? 0,
						unitOfMeasure: data?.unitOfMeasure ?? '',
						storageLocation: data?.storageLocation ?? '',
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
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên</FormLabel>
									<FormControl>
										<Input placeholder="Tên" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="quantityInStock"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số lượng</FormLabel>
									<FormControl>
										<Input type="number" placeholder="Số lượng" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="unitOfMeasure"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đơn vị tính</FormLabel>
									<FormControl>
										<Input type="text" placeholder="Đơn vị tính" {...field} />
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
									<FormLabel>Vị trí kho</FormLabel>
									<FormControl>
										<Input type="text" placeholder="Vị trí kho" {...field} />
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

export default ComponentDetailForm
