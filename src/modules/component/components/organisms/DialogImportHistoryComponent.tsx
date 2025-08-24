import { activityLogsControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {} from '@/components/ui/form'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { importComponentColumns } from '@/modules/component-set-detail/components/organisms/importComponentColumns'
import { useQuery } from '@tanstack/react-query'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	id: string
}

const DialogImportHistoryComponent = ({ open, onOpenChange, id }: Props) => {
	const { data } = useQuery({
		...activityLogsControllerSearchOptions({
			query: { activityType: 'Tăng số lượng thiết bị' },
		}),
		select: (data) => {
			return data.data.filter((item) => {
				return item.componentId?._id === id
			})
		},
	})

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Lịch sử nhập thêm linh kiện</DialogTitle>
					<DialogDescription className="hidden" />
					{/* <div className="mt-5 space-y-6">
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
							<div className="flex items-center justify-end gap-x-3">
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
					</div> */}
					<DataTable columns={importComponentColumns} data={data || []} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default DialogImportHistoryComponent
