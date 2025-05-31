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
import type { CategoryEquipmentSetDetailSchema } from '@/configs/schema'
import { equipmentSetTypeGroups } from '@/mocks/equipment.mock'
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
												{equipmentSetTypeGroups.map((typeGroup) => (
													<SelectItem key={typeGroup.id} value={typeGroup.id}>
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
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giá tiền ban đầu</FormLabel>
									<FormControl>
										<Input placeholder="Giá tiền ban đầu" {...field} />
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
										<Input placeholder="Ghi chú" {...field} />
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
