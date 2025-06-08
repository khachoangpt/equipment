'use client'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'decisionNumber',
		header: 'Số quyết định',
	},
	{
		accessorKey: 'unit',
		header: 'Đơn vị',
		cell: ({ row }) => row.original.unit?.name,
	},
	{
		accessorKey: 'liquidationDate',
		header: 'Ngày thanh lý',
	},
	{
		accessorKey: 'creator',
		header: 'Người tạo',
		cell: ({ row }) => row.original.creator?.firstName,
	},
	{
		accessorKey: 'equipmentList',
		header: 'Trang bị',
		cell: ({ row }) => (
			<div>
				{row.original.equipmentList?.map((e: any) => (
					<div key={e._id}>{e.name}</div>
				))}
			</div>
		),
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
	// 					title="Xoá hoạt động thanh lý"
	// 					description="Bạn có chắc chắn muốn xoá hoạt động thanh lý này"
	// 					open={open}
	// 					onOpenChange={setOpen}
	// 					onConfirm={handleDelete}
	// 				/>
	// 			</div>
	// 		)
	// 	},
	// },
]
