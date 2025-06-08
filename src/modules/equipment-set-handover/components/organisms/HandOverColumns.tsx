'use client'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'voucherNumber',
		header: 'Số biên bản',
	},
	{
		accessorKey: 'fromUnit',
		header: 'Đơn vị giao',
		cell: ({ row }) => row.original.fromUnit?.name,
	},
	{
		accessorKey: 'receiver',
		header: 'Người nhận',
		cell: ({ row }) => row.original.receiver?.firstName,
	},
	{
		accessorKey: 'toUnit',
		header: 'Đơn vị nhận',
		cell: ({ row }) => row.original.toUnit?.name,
	},
	{
		accessorKey: 'handoverDate',
		header: 'Ngày bàn giao',
		cell: ({ row }) =>
			new Date(row.original.handoverDate).toLocaleDateString('vi-VN'),
	},
	{
		accessorKey: 'equipments',
		header: 'Trang bị',
		cell: ({ row }) => (
			<div>
				{row.original.equipment?.map((e: any) => (
					<div key={e._id}>{e.name}</div>
				))}
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
