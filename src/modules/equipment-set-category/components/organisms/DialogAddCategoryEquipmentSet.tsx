import { equipmentGroupsControllerFindAllOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
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
import type { CategoryEquipmentSetDetailSchema } from '@/configs/schema'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import useCategoryEquipmentSetDetailController from '../../controllers/category-equipment-set-detail.controller'

type Props = {
	id?: string
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: SubmitHandler<CategoryEquipmentSetDetailSchema>
}

const DialogAddCategoryEquipmentSet = ({
	onOpenChange,
	open,
	onConfirm,
	id,
}: Props) => {
	const title = id ? 'Chỉnh sửa danh mục trang bị' : 'Thêm danh mục trang bị'
	const { categoryEquipmentSetDetailForm } =
		useCategoryEquipmentSetDetailController({ id })
	const { control, handleSubmit } = categoryEquipmentSetDetailForm
	const { data: typeGroups } = useQuery({
		...equipmentGroupsControllerFindAllOptions(),
	})

	useEffect(() => {
		if (!open) {
			categoryEquipmentSetDetailForm.reset()
		}
	}, [open])

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription className="hidden" />
				</DialogHeader>
				<div className="mt-5 space-y-5">
					<Form {...categoryEquipmentSetDetailForm}>
						<FormField
							control={control}
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
							control={control}
							name="type"
							render={({ field: { onChange, value } }) => (
								<FormItem key={value}>
									<FormLabel>Nhóm loại</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Nhóm loại" />
											</SelectTrigger>
											<SelectContent>
												{typeGroups?.data?.map((typeGroup) => (
													<SelectItem key={typeGroup._id} value={typeGroup._id}>
														{typeGroup.name}
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
							name="field"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lĩnh vực</FormLabel>
									<FormControl>
										<Input placeholder="Lĩnh vực" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="defaultAmount"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Giá tiền ban đầu</FormLabel>
									<FormControl>
										<Input
											placeholder="Giá tiền ban đầu"
											onChange={(e) => {
												if (Number.isNaN(Number(e.target.value))) return
												onChange(Number(e.target.value))
											}}
											value={value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="note"
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
						<div className="flex items-center justify-center gap-x-3">
							<Button
								size="lg"
								type="button"
								variant="secondary"
								onClick={() => onOpenChange(false)}
							>
								Huỷ
							</Button>
							<Button size="lg" type="submit" onClick={handleSubmit(onConfirm)}>
								{id ? 'Lưu' : 'Thêm'}
							</Button>
						</div>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default DialogAddCategoryEquipmentSet
