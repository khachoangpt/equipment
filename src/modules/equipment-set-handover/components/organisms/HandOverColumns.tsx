'use client'
import { equipmentHandoverControllerGenerateHandoverReportFromLogMutation } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
	},
	{
		id: 'reportNumber',
		accessorKey: 'details',
		header: 'Số biên bản',
		cell: ({ row }) => {
			return row.original?.reportNumber
		},
	},
	{
		id: 'sender',
		accessorKey: 'details',
		header: 'Đơn vị giao',
		cell: ({ row }) => row.original.fromUnitId?.name,
	},
	{
		id: 'receiver',
		accessorKey: 'details',
		header: 'Đơn vị nhận',
		cell: ({ row }) => row.original.toUnitId?.name,
	},
	{
		id: 'handoverDate',
		accessorKey: 'details',
		header: 'Ngày giao',
		cell: ({ row }) =>
			new Date(row.original?.handoverDate).toLocaleDateString('vi-VN'),
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			// const [open, setOpen] = useState<boolean>(false)

			// const handleDelete = () => {
			// 	setOpen(false)
			// }
			const { mutateAsync, isPending } = useMutation({
				...equipmentHandoverControllerGenerateHandoverReportFromLogMutation(),
			})

			const handleGenerateReport = async () => {
				const res = await mutateAsync({
					path: { id: row.original._id },
					responseType: 'arraybuffer',
				})

				handleDownload(
					res as string,
					`Bien_ban_ban_giao_${row.original.reportNumber}.pdf`,
				)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Button
						variant={'ghost'}
						disabled={isPending}
						onClick={handleGenerateReport}
						className="text-green-600 cursor-pointer"
					>
						Xuất PDF
					</Button>
					{/* <Link href={'#'} className="text-blue-600">
						Chỉnh sửa
					</Link>
					<p
						className="text-red-600 cursor-pointer"
						onClick={() => setOpen(true)}
					>
						Xoá
					</p>
					<DialogConfirmDelete
						title="Xoá hoạt động bàn giao"
						description="Bạn có chắc chắn muốn xoá hoạt động bàn giao này"
						open={open}
						onOpenChange={setOpen}
						onConfirm={handleDelete}
					/> */}
				</div>
			)
		},
	},
]

const handleDownload = (pdfContent: string, fileName = 'document.pdf') => {
	const blob = new Blob([pdfContent], { type: 'application/pdf' })
	const url = URL.createObjectURL(blob)

	const link = document.createElement('a')
	link.href = url
	link.download = fileName
	link.click()

	URL.revokeObjectURL(url)
}
