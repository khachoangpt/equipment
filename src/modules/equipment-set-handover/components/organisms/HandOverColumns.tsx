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
		id: 'sender',
		accessorKey: 'details',
		header: 'Người giao',
		cell: ({ row }) => row.original.sender,
	},
	{
		id: 'receiver',
		accessorKey: 'details',
		header: 'Người nhận',
		cell: ({ row }) => row.original.receiver,
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
					`Bien_ban_ban_giao_${row.original.reportNumber}.xlsx`,
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
						Xuất Excel
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

const handleDownload = (excelContent: string, fileName = 'document.xlsx') => {
	const blob = new Blob([excelContent], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml+xml',
	})
	const url = URL.createObjectURL(blob)

	const link = document.createElement('a')
	link.href = url
	link.download = fileName
	link.click()

	URL.revokeObjectURL(url)
}
