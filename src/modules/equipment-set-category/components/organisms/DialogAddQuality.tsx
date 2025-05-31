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
import type { QualityDetailSchema } from '@/configs/schema'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import useQualityDetailController from '../../controllers/quality-detail.controller'

type Props = {
	id?: string
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: SubmitHandler<QualityDetailSchema>
}

const DialogAddQuality = ({ onOpenChange, open, id, onConfirm }: Props) => {
	const title = id
		? 'Chỉnh sửa danh mục phân cấp chất lượng trang bị'
		: 'Thêm danh mục phân cấp chất lượng trang bị'
	const { qualityDetailForm } = useQualityDetailController({ id })
	const { control, handleSubmit } = qualityDetailForm

	useEffect(() => {
		if (!open) {
			qualityDetailForm.reset()
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
					<Form {...qualityDetailForm}>
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên phân cấp</FormLabel>
									<FormControl>
										<Input placeholder="Tên phân cấp" {...field} />
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
									<FormLabel>Mã phân cấp</FormLabel>
									<FormControl>
										<Input placeholder="Mã phân cấp" {...field} />
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

export default DialogAddQuality
