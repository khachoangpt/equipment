import type { ActivityLog } from '@/client'
import type { ColumnDef } from '@tanstack/react-table'

export const importHistoryColumns: ColumnDef<ActivityLog>[] = [
	{ accessorKey: 'index', header: 'STT', cell: ({ row }) => row.index + 1, minSize: 32 },
	{ accessorKey: 'activityType', header: 'Loại hoạt động', cell: ({ row }) => row.original.activityType ?? '—', minSize: 72 },
	{
		accessorKey: 'details.quantity',
		header: 'Số lượng',
		minSize: 52,
		cell: ({ row }) => {
			const details = row.original.details
			return details?.quantity ?? details?.quantityInStock ?? '—'
		},
	},
	{
		accessorKey: 'details.storageLocation',
		header: 'Vị trí lưu trữ',
		minSize: 68,
		cell: ({ row }) => {
			const d = row.original.details
			return d?.storageLocation ?? '—'
		},
	},
	{
		accessorKey: 'details.importingUnitId',
		header: 'Đơn vị cấp',
		minSize: 72,
		cell: ({ row }) => {
			const d = row.original.details?.importingUnitId
			return (typeof d === 'object' && d !== null && 'name' in d ? (d as { name?: string }).name : null) ?? '—'
		},
	},
	{
		accessorKey: 'details.usingUnitId',
		header: 'Đơn vị nhập',
		minSize: 72,
		cell: ({ row }) => {
			const d = row.original.details?.usingUnitId
			return (typeof d === 'object' && d !== null && 'name' in d ? (d as { name?: string }).name : null) ?? '—'
		},
	},
	{
		accessorKey: 'details.evaluatingUnitId',
		header: 'Đơn vị đánh giá',
		minSize: 76,
		cell: ({ row }) => {
			const d = row.original.details?.evaluatingUnitId
			return (typeof d === 'object' && d !== null && 'name' in d ? (d as { name?: string }).name : null) ?? '—'
		},
	},
	{
		accessorKey: 'details.evaluationResult',
		header: 'Nội dung đánh giá',
		minSize: 76,
		cell: ({ row }) => row.original.details?.evaluationResult ?? '—',
	},
	{ accessorKey: 'details.notes', header: 'Ghi chú', minSize: 56, cell: ({ row }) => row.original.details?.notes ?? '—' },
	{
		accessorKey: 'createdAt',
		header: 'Ngày nhập kho',
		minSize: 76,
		cell: ({ row }) =>
			new Date(row.original.createdAt).toLocaleDateString('vi-VN'),
	},
]
