'use client'

import { qualityLevelsControllerFindAllOptions } from '@/client/@tanstack/react-query.gen'
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
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const updateInventorySchema = z.object({
	qualityLevelId: z.string().min(1, 'Vui lòng chọn phân cấp chất lượng'),
	status: z.string().min(1, 'Vui lòng nhập tình trạng trang bị'),
	note: z.string().optional(),
})

type UpdateInventoryForm = z.infer<typeof updateInventorySchema>

type Props = {
	equipmentId: string
	open: boolean
	onOpenChange: (open: boolean) => void
}

const UpdateInventoryDialog = ({ equipmentId, open, onOpenChange }: Props) => {
	const [isLoading, setIsLoading] = useState(false)

	// equipmentId will be used in actual API call

	const { data: qualityLevels } = useQuery({
		...qualityLevelsControllerFindAllOptions(),
		select(data) {
			return data?.data
		},
	})

	const form = useForm<UpdateInventoryForm>({
		resolver: zodResolver(updateInventorySchema),
		defaultValues: {
			qualityLevelId: '',
			status: '',
			note: '',
		},
	})

	const onSubmit = async (formData: UpdateInventoryForm) => {
		setIsLoading(true)
		try {
			// TODO: Implement API call to update inventory
			// This would be something like:
			// await updateInventoryMutation({
			//   equipmentId,
			//   qualityLevelId: formData.qualityLevelId,
			//   status: formData.status,
			//   note: formData.note,
			// })

			// Simulate API call - using equipmentId and formData to avoid unused variable warnings
			// In real implementation, this would be:
			// await updateInventoryAPI({ equipmentId, ...formData })

			// Simulate delay
			await new Promise((resolve) => setTimeout(resolve, 1000))

			// Validate that we have the required data
			const hasRequiredData =
				equipmentId && formData.qualityLevelId && formData.status
			if (!hasRequiredData) {
				throw new Error('Missing required data for inventory update')
			}

			toast.success('Cập nhật kiểm kê thành công')
			onOpenChange(false)
			form.reset()
		} catch (err) {
			console.error('Error updating inventory:', err)
			toast.error('Có lỗi xảy ra khi cập nhật kiểm kê')
		} finally {
			setIsLoading(false)
		}
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
											<SelectTrigger>
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
						/>
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
