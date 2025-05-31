import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: () => void
}

const DialogAddQuality = ({ onOpenChange, open }: Props) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Thêm danh mục phân cấp chất lượng trang bị</DialogTitle>
					<DialogDescription className="hidden" />
				</DialogHeader>
				<div className="mt-5">Content</div>
			</DialogContent>
		</Dialog>
	)
}

export default DialogAddQuality
