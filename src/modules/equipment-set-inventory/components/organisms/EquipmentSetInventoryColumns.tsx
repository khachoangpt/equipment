import { pageList } from '@/configs/routes'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import UpdateInventoryDialog from './UpdateInventoryDialog'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
	},
	{
		accessorKey: 'instanceId',
		header: 'Tên',
		cell: ({ row }) => {
			return (
				<Link
					href={
						pageList.equipmentSetDetail({
							id: row.original?._id ?? '',
						}).href
					}
					className="text-right"
				>
					{row.original.instanceId?.name}
				</Link>
			)
		},
	},
	{
		accessorKey: 'instanceId.serialNumber',
		header: 'Mã hiệu serial',
	},
	{
		accessorKey: 'usingUnitId',
		header: 'Đơn vị sử dụng',
		cell: ({ row }) => {
			return (
				<span className="text-right">{row.original.usingUnitId?.name}</span>
			)
		},
	},
	{
		accessorKey: 'status',
		header: 'Tình trạng',
	},
	{
		accessorKey: 'qualityLevelId',
		header: 'Phân cấp chất lượng',
		cell: ({ row }) => {
			return (
				<span className="text-right">
					{row.original.qualityLevelDetails?.name}
				</span>
			)
		},
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [open, setOpen] = useState<boolean>(false)

			return (
				<div className="flex items-center justify-end gap-x-3">
					<button
						type="button"
						className="text-blue-600 cursor-pointer"
						onClick={() => setOpen(true)}
					>
						Cập nhật kiểm kê
					</button>
					<UpdateInventoryDialog
						equipmentId={row.original._id}
						open={open}
						onOpenChange={setOpen}
					/>
				</div>
			)
		},
	},
]
