import {
	componentsControllerAddComponentStockMutation,
	componentsControllerFindAllQueryKey,
} from '@/client/@tanstack/react-query.gen'
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
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/configs/query-client'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	id: string
}

const DialogImportComponent = ({ open, onOpenChange, id }: Props) => {
	const { mutate } = useMutation({
		...componentsControllerAddComponentStockMutation(),
	})
	const form = useForm<{ quantity: number; notes: string }>({
		defaultValues: { quantity: 0, notes: '' },
	})

	const onConfirm: SubmitHandler<{ quantity: number; notes: string }> = (
		data,
	) => {
		mutate(
			{
				path: { id },
				body: {
					quantity: Number(data.quantity),
					notes: data.notes,
				},
			},
			{
				onError: (error) => {
					toast.error((error.response?.data as any)?.message)
				},
				onSuccess: async () => {
					await queryClient.invalidateQueries({
						queryKey: componentsControllerFindAllQueryKey(),
					})
					toast.success('Thêm thành công')
					onOpenChange(false)
					form.reset()
				},
			},
		)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nhập thêm linh kiện</DialogTitle>
					<DialogDescription className="hidden" />
					<div className="mt-5 space-y-6">
						<Form {...form}>
							<FormField
								rules={{
									required: { message: 'Chưa nhập số lượng', value: true },
									min: {
										message: 'Số lượng phải lớn hơn 0',
										value: 1,
									},
									validate: (value) => {
										if (Number.isNaN(Number(value))) {
											return 'Số lượng không hợp lệ'
										}
										return true
									},
								}}
								control={form.control}
								name="quantity"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>Số lượng</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
							<FormField
								control={form.control}
								name="notes"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>Ghi chú</FormLabel>
											<FormControl>
												<Textarea {...field} />
											</FormControl>
										</FormItem>
									)
								}}
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
								<Button
									size="lg"
									type="submit"
									onClick={form.handleSubmit(onConfirm)}
								>
									Thêm
								</Button>
							</div>
						</Form>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default DialogImportComponent
