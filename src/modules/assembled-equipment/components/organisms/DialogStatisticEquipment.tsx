import { equipmentHandoverControllerGenerateAnnualReceptionReportMutation } from '@/client/@tanstack/react-query.gen'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {} from '@/configs/schema'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const DialogStatisticEquipment = ({ onOpenChange, open }: Props) => {
	const statisticHandoverForm = useForm<{ year: string }>({
		defaultValues: { year: dayjs().year().toString() },
	})
	const { control, handleSubmit } = statisticHandoverForm
	const { mutate } = useMutation({
		...equipmentHandoverControllerGenerateAnnualReceptionReportMutation(),
	})

	const onSubmit: SubmitHandler<any> = (data: any) => {
		mutate(
			{
				query: {
					year: data.year,
				},
				responseType: 'arraybuffer',
			},
			{
				onError: (error) => {
					if (error.status === 404) {
						toast.error('Không có dữ liệu bàn giao trong khoảng thời gian này.')
						return
					}
					toast.error('Đã có lỗi xảy ra')
				},
				onSuccess: (res) => {
					handleDownload(
						res as string,
						`Danh_muc_trang_bi_tiep_nhan_${data.year}.pdf`,
					)
					onOpenChange(false)
				},
			},
		)
	}

	const handleDownload = (pdfContent: string, fileName = 'document.pdf') => {
		const blob = new Blob([pdfContent], { type: 'application/pdf' })
		const url = URL.createObjectURL(blob)

		const link = document.createElement('a')
		link.href = url
		link.download = fileName
		link.click()

		URL.revokeObjectURL(url)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Thống kê trang bị tiếp nhận</DialogTitle>
					<DialogDescription className="hidden" />
				</DialogHeader>
				<div className="mt-5 space-y-5">
					<Form {...statisticHandoverForm}>
						<FormField
							control={control}
							name="year"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Năm</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Năm" />
											</SelectTrigger>
											<SelectContent>
												{Array.from(
													{ length: new Date().getFullYear() - 2020 + 1 },
													(_, index) => 2020 + index,
												).map((year) => (
													<SelectItem key={year} value={year.toString()}>
														{year}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
							<Button size="lg" type="submit" onClick={handleSubmit(onSubmit)}>
								Thống kê
							</Button>
						</div>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default DialogStatisticEquipment
