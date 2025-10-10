import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
	},
	{
		accessorKey: 'activityType',
		header: 'Hành động',
		cell: ({ row }) => {
			const operation = row.original.operation
			let label = ''
			if (operation === 'CREATE') {
				label = 'Thêm mới'
			} else if (operation === 'UPDATE') {
				label = 'Cập nhật'
			} else if (operation === 'DELETE') {
				label = 'Xóa'
			}
			return <div>{label}</div>
		},
	},
	{
		accessorKey: 'createdBy',
		header: 'Người thực hiện',
		cell: ({ row }) => {
			return (
				<div>
					{row.original.accountInfo?.fullName ??
						row.original.accountInfo?.username}
				</div>
			)
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Ngày',
		cell: ({ row }) => {
			return new Date(row.original.createdAt).toLocaleDateString('vi-VN')
		},
	},
	{
		accessorKey: 'content',
		header: 'Nội dung',
		cell: ({ row }) => {
			return (
				<div className="whitespace-pre-wrap break-words max-w-[500px]">
					{row.original.content}
				</div>
			)
		},
	},
]
