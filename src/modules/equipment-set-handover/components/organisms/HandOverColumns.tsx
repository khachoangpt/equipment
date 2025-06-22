'use client'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<any>[] = [
	{
		id: 'reportNumber',
		accessorKey: 'details',
		header: 'Số biên bản',
		cell: ({ row }) => row.original.details?.reportNumber,
	},
	{
		id: 'serialNumber',
		accessorKey: 'instanceId',
		header: 'Mã hiệu serial',
		cell: ({ row }) => row.original.instanceId?.serialNumber,
	},
	{
		id: 'fromUnit',
		accessorKey: 'details',
		header: 'Đơn vị giao',
		cell: ({ row }) => row.original.details?.fromUnitId?.name,
	},
	{
		id: 'toUnit',
		accessorKey: 'details',
		header: 'Đơn vị nhận',
		cell: ({ row }) => row.original.details?.toUnitId?.name,
	},
	{
		id: 'sender',
		accessorKey: 'details',
		header: 'Người giao',
		cell: ({ row }) => row.original.details.sender,
	},
	{
		id: 'receiver',
		accessorKey: 'details',
		header: 'Người nhận',
		cell: ({ row }) => row.original.details.receiver,
	},
	{
		id: 'handoverDate',
		accessorKey: 'details',
		header: 'Ngày giao',
		cell: ({ row }) =>
			new Date(row.original.details.handoverDate).toLocaleDateString('vi-VN'),
	},
	{
		id: 'note',
		accessorKey: 'details',
		header: 'Ghi chú',
		cell: ({ row }) => (
			<div className="whitespace-pre-wrap break-words max-w-[250px]">
				{row.original.notes}
			</div>
		),
	},
	{
		id: 'comment',
		accessorKey: 'details',
		header: 'Nhận xét',
		cell: ({ row }) => (
			<div className="whitespace-pre-wrap break-words max-w-[250px]">
				{row.original.details.comment}
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
	// 					title="Xoá hoạt động bàn giao"
	// 					description="Bạn có chắc chắn muốn xoá hoạt động bàn giao này"
	// 					open={open}
	// 					onOpenChange={setOpen}
	// 					onConfirm={handleDelete}
	// 				/>
	// 			</div>
	// 		)
	// 	},
	// },
]
