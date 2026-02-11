import type { ActivityLog } from '@/client'
import type { ColumnDef } from '@tanstack/react-table'

export const importComponentColumns: ColumnDef<ActivityLog>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
		cell: ({ row }) => row.index + 1,
	},
	{
		accessorKey: 'details.quantity',
		header: 'Số lượng',
		cell: ({ row }) => {
			const details = row.original.details
			return details?.quantity ?? details?.quantityInStock ?? '—'
		},
	},
	{ accessorKey: 'details.notes', header: 'Ghi chú' },
	{
		accessorKey: 'createdAt',
		header: 'Ngày thêm',
		cell: ({ row }) =>
			new Date(row.original.createdAt).toLocaleDateString('vi-VN'),
	},
]
