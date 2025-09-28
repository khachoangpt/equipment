'use client'
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
		cell: ({ row }) => row.original?.reportNumber,
	},
	{
		id: 'repairLocation',
		accessorKey: 'details',
		header: 'Nơi bảo dưỡng',
		cell: ({ row }) => row.original?.repairLocation,
	},
	{
		id: 'repairDate',
		accessorKey: 'details',
		header: 'Ngày gửi',
		cell: ({ row }) =>
			row.original?.repairDate
				? new Date(row.original.repairDate as string).toLocaleDateString(
						'vi-VN',
					)
				: '',
	},
	{
		id: 'receivedDate',
		accessorKey: 'details',
		header: 'Ngày nhận',
		cell: ({ row }) =>
			row.original?.receivedDate
				? new Date(row.original.receivedDate as string).toLocaleDateString(
						'vi-VN',
					)
				: '',
	},
	{
		id: 'reason',
		accessorKey: 'details',
		header: 'Lý do',
		cell: ({ row }) => row.original?.reason,
	},
	{
		id: 'result',
		accessorKey: 'details',
		header: 'Kết quả',
		cell: ({ row }) => row.original?.repairResult,
	},
	{
		id: 'notes',
		accessorKey: 'details',
		header: 'Ghi chú',
		cell: ({ row }) => (
			<div className="whitespace-pre-wrap break-words max-w-[250px]">
				{row.original?.notes as string}
			</div>
		),
	},
	{
		id: 'comment',
		accessorKey: 'details',
		header: 'Nhận xét',
		cell: ({ row }) => (
			<div className="whitespace-pre-wrap break-words max-w-[250px]">
				{row.original?.comment as string}
			</div>
		),
	},

	// {
	// 	id: 'actions',
	// 	enableResizing: false,
	// 	size: 1,
	// 	cell: () => {
	// 		const [open, setOpen] = useState<boolean>(false)

	// 		const handleDelete = () => {
	// 			setOpen(false)
	// 		}

	// 		return (
	// 			<div className="flex items-center justify-end gap-x-3">
	// 				<Link href={'#'} className="text-blue-600">
	// 					Chỉnh sửa
	// 				</Link>
	// 				<p
	// 					className="text-red-600 cursor-pointer"
	// 					onClick={() => setOpen(true)}
	// 				>
	// 					Xoá
	// 				</p>
	// 				<DialogConfirmDelete
	// 					title="Xoá hoạt động bảo dưỡng/sửa chữa"
	// 					description="Bạn có chắc chắn muốn xoá hoạt động bảo dưỡng/sửa chữa này"
	// 					open={open}
	// 					onOpenChange={setOpen}
	// 					onConfirm={handleDelete}
	// 				/>
	// 			</div>
	// 		)
	// 	},
	// },
]
