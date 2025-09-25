import { equipmentHandoverControllerGenerateHandoverEvaluationReportByDateMutation } from '@/client/@tanstack/react-query.gen'
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
import {
	type StatisticHandoverSchema,
	statisticHandoverSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const DialogStatisticHandover = ({ onOpenChange, open }: Props) => {
	const defaultValues: StatisticHandoverSchema = {
		startDate: dayjs().toString(),
		endDate: dayjs().toString(),
	}
	const statisticHandoverForm = useForm<StatisticHandoverSchema>({
		defaultValues,
		resolver: zodResolver(statisticHandoverSchema),
	})
	const { control, handleSubmit } = statisticHandoverForm
	const { mutate } = useMutation({
		...equipmentHandoverControllerGenerateHandoverEvaluationReportByDateMutation(),
	})

	const onSubmit: SubmitHandler<any> = (data: any) => {
		mutate(
			{
				query: {
					startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
					endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
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
						`Bao_cao_ban_giao_${dayjs(data.startDate).format('DD-MM-YYYY')}_${dayjs(data.endDate).format('DD-MM-YYYY')}.pdf`,
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
					<DialogTitle>Thống kê trang bị đã bàn giao</DialogTitle>
					<DialogDescription className="hidden" />
				</DialogHeader>
				<div className="mt-5 space-y-5">
					<Form {...statisticHandoverForm}>
						<FormField
							control={control}
							name="startDate"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Ngày bắt đầu</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => onChange(e.toString())}
											value={dayjs(value).toDate()}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="endDate"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Ngày kết thúc</FormLabel>
									<FormControl>
										<DatePicker
											onChange={(e) => onChange(e.toString())}
											value={dayjs(value).toDate()}
										/>
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

export default DialogStatisticHandover
