'use client'
import type { ActivityLog } from '@/client'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<ActivityLog>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
		cell: ({ row }) => {
			return <div>{row.index + 1}</div>
		},
	},
	{
		id: 'reportNumber',
		accessorKey: 'details',
		header: 'Số biên bản',
		cell: ({ row }) => row.original.details.reportNumber,
	},
	{
		id: 'equipment',
		accessorKey: 'instanceId',
		header: 'Serial trang bị',
		cell: ({ row }) => row.original.instanceId.serialNumber,
	},
	{
		id: 'repairLocation',
		accessorKey: 'details',
		header: 'Nơi bảo dưỡng',
		cell: ({ row }) => row.original.details.repairLocation,
	},
	{
		id: 'sendDate',
		accessorKey: 'details',
		header: 'Ngày gửi',
		cell: ({ row }) =>
			row.original.details.sentDate
				? new Date(row.original.details.sentDate as string).toLocaleDateString(
						'vi-VN',
					)
				: '',
	},
	{
		id: 'receivedDate',
		accessorKey: 'details',
		header: 'Ngày nhận',
		cell: ({ row }) =>
			row.original.details.receivedDate
				? new Date(
						row.original.details.receivedDate as string,
					).toLocaleDateString('vi-VN')
				: '',
	},
	{
		id: 'sender',
		accessorKey: 'details',
		header: 'Người gửi',
		cell: ({ row }) => row.original.details.sender,
	},
	{
		id: 'receiver',
		accessorKey: 'details',
		header: 'Người nhận',
		cell: ({ row }) => row.original.details.receiver,
	},
	{
		id: 'reason',
		accessorKey: 'details',
		header: 'Lý do',
		cell: ({ row }) => row.original.details.reason,
	},
	{
		id: 'result',
		accessorKey: 'details',
		header: 'Kết quả',
		cell: ({ row }) => row.original.details.result,
	},
	{
		id: 'notes',
		accessorKey: 'details',
		header: 'Ghi chú',
		cell: ({ row }) => (
			<div className="whitespace-pre-wrap break-words max-w-[250px]">
				{row.original.details.notes as string}
			</div>
		),
	},
	{
		id: 'comment',
		accessorKey: 'details',
		header: 'Nhận xét',
		cell: ({ row }) => (
			<div className="whitespace-pre-wrap break-words max-w-[250px]">
				{row.original.details.comment as string}
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
