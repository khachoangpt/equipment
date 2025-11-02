'use client'

import {
	equipmentRepairControllerCompleteMutation,
	equipmentRepairControllerSearchQueryKey,
} from '@/client/@tanstack/react-query.gen'
import { DatePicker } from '@/components/custom/date-picker/DatePicker'
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
	repairId: string
}

type CompleteRepairForm = {
	receivedDate?: string
	repairResult?: string
	notes?: string
}

const DialogCompleteRepair = ({ open, onOpenChange, repairId }: Props) => {
	const form = useForm<CompleteRepairForm>({
		defaultValues: {
			receivedDate: new Date().toISOString().split('T')[0],
			repairResult: '',
			notes: '',
		},
	})

	const { mutate: completeRepair, isPending } = useMutation({
		...equipmentRepairControllerCompleteMutation(),
	})

	const onConfirm: SubmitHandler<CompleteRepairForm> = (data) => {
		completeRepair(
			{
				path: { id: repairId },
				body: {
					receivedDate: data.receivedDate
						? new Date(data.receivedDate).toISOString()
						: undefined,
					repairResult: data.repairResult || undefined,
					notes: data.notes || undefined,
				},
			},
			{
				onSuccess: () => {
					toast.success('Hoàn thành sửa chữa thành công')
					form.reset()
					onOpenChange(false)
					queryClient.invalidateQueries({
						queryKey: equipmentRepairControllerSearchQueryKey(),
					})
				},
				onError: (error: any) => {
					toast.error(
						<div
							dangerouslySetInnerHTML={{
								__html: (error.response?.data as any)?.message,
							}}
						/>,
					)
				},
			},
		)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Hoàn thành sửa chữa</DialogTitle>
					<DialogDescription className="hidden" />
					<div className="mt-5 space-y-6">
						<Form {...form}>
							<FormField
								control={form.control}
								name="receivedDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ngày nhận lại sau sửa chữa</FormLabel>
										<FormControl>
											<DatePicker
												value={field.value ? new Date(field.value) : new Date()}
												onChange={(date) => {
													if (date && !Number.isNaN(date.getTime())) {
														field.onChange(date.toISOString().split('T')[0])
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="repairResult"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Kết quả sửa chữa</FormLabel>
										<FormControl>
											<Input placeholder="Kết quả sửa chữa" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="notes"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ghi chú tổng quan và chi phí</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Ghi chú tổng quan và chi phí"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center justify-end gap-x-3">
								<Button
									size="lg"
									type="button"
									variant="secondary"
									onClick={() => onOpenChange(false)}
									disabled={isPending}
								>
									Huỷ
								</Button>
								<Button
									size="lg"
									type="submit"
									onClick={form.handleSubmit(onConfirm)}
									disabled={isPending}
								>
									{isPending ? 'Đang xử lý...' : 'Hoàn thành'}
								</Button>
							</div>
						</Form>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default DialogCompleteRepair
