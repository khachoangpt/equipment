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
import type { TypeGroupDetailSchema } from '@/configs/schema'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import useTypeGroupDetailController from '../../controllers/type-group-detail.controller'

type Props = {
	id?: string
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: SubmitHandler<TypeGroupDetailSchema>
}

const DialogAddTypeGroup = ({ onOpenChange, open, id, onConfirm }: Props) => {
	const title = id
		? 'Chỉnh sửa danh mục nhóm loại trang bị'
		: 'Thêm danh mục nhóm loại trang bị'
	const { typeGroupDetailForm } = useTypeGroupDetailController({ id })
	const { control, handleSubmit } = typeGroupDetailForm

	useEffect(() => {
		if (!open) {
			typeGroupDetailForm.reset()
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
					<Form {...typeGroupDetailForm}>
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên danh mục</FormLabel>
									<FormControl>
										<Input placeholder="Tên danh mục" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mã nhóm</FormLabel>
									<FormControl>
										<Input placeholder="Mã nhóm" {...field} />
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

export default DialogAddTypeGroup
