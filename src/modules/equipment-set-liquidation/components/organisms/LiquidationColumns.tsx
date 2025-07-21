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
		accessorKey: 'details.decisionNumber',
		header: 'Số quyết định',
	},
	{
		accessorKey: 'details.disposalDate',
		header: 'Ngày thanh lý',
		cell: ({ row }) =>
			new Date(row.original.details.disposalDate as string).toLocaleDateString(
				'vi-VN',
			),
	},
	{
		accessorKey: 'details.createdBy',
		header: 'Người lập',
	},
	{
		accessorKey: 'details.signer',
		header: 'Người ký',
	},
	{
		accessorKey: 'instanceId.serialNumber',
		header: 'Serial trang bị',
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
