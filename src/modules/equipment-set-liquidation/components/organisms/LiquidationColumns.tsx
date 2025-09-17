'use client'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
	},
	{
		accessorKey: 'decisionNumber',
		header: 'Số quyết định',
	},
	{
		accessorKey: 'details.disposalDate',
		header: 'Ngày thanh lý',
		cell: ({ row }) =>
			new Date(row.original?.disposalDate as string).toLocaleDateString(
				'vi-VN',
			),
	},
	{
		accessorKey: 'signer',
		header: 'Người ký',
	},
	{
		accessorKey: 'instanceId',
		header: 'Trang bị',
		cell: ({ row }) => {
			return `(${row.original?.instanceId?.serialNumber}) ${row.original?.instanceId?.name}`
		},
	},
	{
		accessorKey: 'notes',
		header: 'Ghi chú',
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: () => {
			// const [open, setOpen] = useState<boolean>(false)

			// const handleDelete = () => {
			// 	setOpen(false)
			// }

			return (
				<div className="flex items-center justify-end gap-x-3">
					{/* <Button
						variant={'ghost'}
						disabled={isPending}
						onClick={handleGenerateReport}
						className="text-green-600 cursor-pointer"
					>
						Xuất PDF
					</Button> */}
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
