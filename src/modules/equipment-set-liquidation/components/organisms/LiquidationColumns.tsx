'use client'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'decisionNumber',
		header: 'Số QĐ (Số Quyết định)',
	},
	{
		accessorKey: 'unit',
		header: 'Đơn vị',
	},
	{
		accessorKey: 'liquidationDate',
		header: 'Ngày thanh lý',
	},
	{
		accessorKey: 'creator',
		header: 'Người lập',
	},
	{
		accessorKey: 'signatory',
		header: 'Người ký',
	},
	{
		accessorKey: 'note',
		header: 'Ghi chú',
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: () => {
			const [open, setOpen] = useState<boolean>(false)

			const handleDelete = () => {
				setOpen(false)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Link href={'#'} className="text-blue-600">
						Chỉnh sửa
					</Link>
					<p
						className="text-red-600 cursor-pointer"
						onClick={() => setOpen(true)}
					>
						Xoá
					</p>
					<DialogConfirmDelete
						title="Xoá hoạt động thanh lý"
						description="Bạn có chắc chắn muốn xoá hoạt động thanh lý này"
						open={open}
						onOpenChange={setOpen}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
