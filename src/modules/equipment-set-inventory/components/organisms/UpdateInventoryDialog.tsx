'use client'

import {
	equipmentInstancesControllerGetInstancesWithGroupedDetailsQueryKey,
	equipmentInstancesControllerUpdateInventoryMutation,
	qualityLevelsControllerFindAllOptions,
} from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const updateInventorySchema = z.object({
	qualityLevelId: z.string().min(1, 'Vui lòng chọn phân cấp chất lượng'),
	status: z.string().min(1, 'Vui lòng nhập tình trạng trang bị'),
	note: z.string().optional(),
	quantity: z.number().min(1, 'Vui lòng nhập số lượng'),
})

type UpdateInventoryForm = z.infer<typeof updateInventorySchema>

type Props = {
	equipmentId?: string
	currentStatus?: string
	currentQualityLevelId?: string
	open: boolean
	onOpenChange: (open: boolean) => void
}

const UpdateInventoryDialog = ({
	equipmentId,
	currentStatus = '',
	currentQualityLevelId,
	open,
	onOpenChange,
}: Props) => {
	const { data: qualityLevels } = useQuery({
		...qualityLevelsControllerFindAllOptions(),
		select(data) {
			return data?.data?.slice()?.sort((a, b) => a.name.localeCompare(b.name))
		},
	})

	const { mutate: updateInventory, isPending: isLoading } = useMutation({
		...equipmentInstancesControllerUpdateInventoryMutation(),
	})

	const form = useForm<UpdateInventoryForm>({
		resolver: zodResolver(updateInventorySchema),
		defaultValues: {
			qualityLevelId: '',
			status: '',
			note: '',
			quantity: 1,
		},
	})

	const onSubmit = async (formData: UpdateInventoryForm) => {
		updateInventory(
			{
				path: {
					id: equipmentId ?? '',
				},
				body: {
					items: [
						{
							quantityToUpdate: formData.quantity,
							currentStatus: currentStatus,
							currentQualityLevelId: currentQualityLevelId,
							newStatus: formData.status,
							newQualityLevelId: formData.qualityLevelId,
						},
					],
				},
			},
			{
				onSuccess: () => {
					toast.success('Cập nhật kiểm kê thành công')
					queryClient.invalidateQueries({
						queryKey:
							equipmentInstancesControllerGetInstancesWithGroupedDetailsQueryKey(),
					})
					onOpenChange(false)
					form.reset()
				},
				onError: (error) => {
					toast.error(
						<div
							dangerouslySetInnerHTML={{
								__html:
									(error.response?.data as any)?.message ||
									'Có lỗi xảy ra khi cập nhật kiểm kê',
							}}
						/>,
					)
				},
			},
		)
	}

	const handleClose = () => {
		form.reset()
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Cập nhật kiểm kê</DialogTitle>
					<DialogDescription>
						Cập nhật thông tin kiểm kê cho trang bị này
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="qualityLevelId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phân cấp chất lượng</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Chọn phân cấp chất lượng" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{qualityLevels?.map((level) => (
												<SelectItem key={level._id} value={level._id}>
													{level.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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
										<Input placeholder="Nhập tình trạng trang bị" {...field} />
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
									<FormLabel>Số lượng</FormLabel>
									<FormControl>
										<Input
											type="number"
											min={1}
											placeholder="Nhập số lượng"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
							control={form.control}
							name="note"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ghi chú</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Nhập ghi chú (tùy chọn)"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={handleClose}
								disabled={isLoading}
							>
								Hủy
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default UpdateInventoryDialog
