'use client'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'voucherNumber',
		header: 'Số biên bản',
	},
	{
		accessorKey: 'location',
		header: 'Nơi bảo dưỡng',
	},
	{
		accessorKey: 'sendDate',
		header: 'Ngày gửi',
	},
	{
		accessorKey: 'reason',
		header: 'Lý do',
	},
	{
		accessorKey: 'result',
		header: 'Kết quả',
	},
	{
		accessorKey: 'notes',
		header: 'Ghi chú',
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
