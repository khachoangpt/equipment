'use client'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import type { Handover } from '@/types/equipment-set.types'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'

export const columns: ColumnDef<Handover>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		enableResizing: false,
		size: 1,
	},
	{
		accessorKey: 'code',
		header: 'Số biên bản',
	},
	{
		accessorKey: 'handoverPerson',
		header: 'Người giao',
	},
	{
		accessorKey: 'handoverUnit',
		header: 'Đơn vị giao',
	},
	{
		accessorKey: 'receiverPerson',
		header: 'Người nhận',
	},
	{
		accessorKey: 'receiverUnit',
		header: 'Đơn vị nhận',
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
						title="Xoá hoạt động bàn giao"
						description="Bạn có chắc chắn muốn xoá hoạt động bàn giao này"
						open={open}
						onOpenChange={setOpen}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
