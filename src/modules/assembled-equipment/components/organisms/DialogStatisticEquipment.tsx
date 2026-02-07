import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import axiosInstance from '@/configs/axios'
import {} from '@/configs/schema'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const DialogStatisticEquipment = ({ onOpenChange, open }: Props) => {
	const [year, setYear] = useState<string>(new Date().getFullYear().toString())

	const years = Array.from({ length: 101 }, (_, index) => {
		return (index + 2020).toString()
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (selectedYear: string) => {
			const url = '/api/v1/equipments/instances/search'

			// Tính toán entryDateStart và entryDateEnd dựa trên năm
			const yearNum = Number.parseInt(selectedYear, 10)
			const entryDateStart = `${yearNum}-01-01`
			const entryDateEnd = `${yearNum}-12-31`

			try {
				const response = await axiosInstance.get(url, {
					params: {
						type: 'ASSEMBLED_EQUIPMENT',
						exportType: 'excel',
						entryDateStart,
						entryDateEnd,
					},
					responseType: 'arraybuffer',
				})
				return { data: response.data, year: selectedYear }
			} catch (error: any) {
				console.error('Frontend: Request error:', error)
				throw error
			}
		},
	})

	const onSubmit = () => {
		if (!year) {
			toast.error('Vui lòng chọn năm')
			return
		}

		mutate(year, {
			onError: (error: any) => {
				console.error('Error generating statistics report:', error)
				const status = error?.response?.status

				if (status === 404) {
					toast.error('Không tìm thấy trang bị ở năm đã chọn')
					return
				}

				const errorMessage =
					error?.response?.data?.message || error?.message || 'Đã có lỗi xảy ra'
				toast.error(errorMessage)
			},
			onSuccess: (result) => {
				const fileName = `Danh_sach_trang_bi_lap_ghep_${result.year}.xlsx`
				handleDownload(result.data, fileName)
				onOpenChange(false)
			},
		})
	}

	const handleDownload = (
		fileData: ArrayBuffer | string,
		fileName = 'document.xlsx',
	) => {
		const blob = new Blob([fileData], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		})
		const url = URL.createObjectURL(blob)

		const link = document.createElement('a')
		link.href = url
		link.download = fileName
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)

		URL.revokeObjectURL(url)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Thống kê trang bị lắp ghép</DialogTitle>
					<DialogDescription>
						Xuất danh sách trang bị lắp ghép ra file Excel
					</DialogDescription>
				</DialogHeader>
				<div className="mt-5 space-y-5">
					<div className="space-y-4">
						<div className="flex flex-col space-y-2">
							<label htmlFor="year-select" className="text-sm font-medium">
								Năm
							</label>
							<Select value={year} onValueChange={setYear}>
								<SelectTrigger id="year-select" className="w-full">
									<SelectValue placeholder="Chọn năm" />
								</SelectTrigger>
								<SelectContent>
									{years.map((y) => (
										<SelectItem key={y} value={y}>
											{y}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex items-center justify-center gap-x-3">
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
							type="button"
							onClick={onSubmit}
							disabled={isPending}
						>
							{isPending ? 'Đang xuất...' : 'Xuất Excel'}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default DialogStatisticEquipment
