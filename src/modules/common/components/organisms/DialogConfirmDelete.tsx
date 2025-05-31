import { Button } from '@/components/ui/button'
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
	title: string
	description: string
}

const DialogConfirmDelete = ({
	onOpenChange,
	open,
	onConfirm,
	description,
	title,
}: Props) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription className="hidden" />
				</DialogHeader>
				<div className="flex flex-col gap-y-5 mt-5">
					<p className="text-base text-center">{description}</p>
					<div className="flex items-center justify-center gap-x-5">
						<Button
							size="lg"
							variant="secondary"
							onClick={() => onOpenChange(false)}
						>
							Không
						</Button>
						<Button size="lg" onClick={onConfirm}>
							Có
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default DialogConfirmDelete
