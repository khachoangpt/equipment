'use client'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'code',
		header: 'Số biên bản',
	},
	{
		accessorKey: 'maintenancePlace',
		header: 'Nơi bảo dưỡng',
	},
	{
		accessorKey: 'sendDate',
		header: 'Ngày gửi',
	},
	{
		accessorKey: 'receiveDate',
		header: 'Ngày nhận',
	},
	{
		accessorKey: 'senderPerson',
		header: 'Người gửi',
	},
	{
		accessorKey: 'receiverPerson',
		header: 'Người nhận',
	},
	{
		accessorKey: 'senderUnit',
		header: 'Đơn vị gửi',
	},
	{
		accessorKey: 'reason',
		header: 'Lý do',
	},
	{
		accessorKey: 'note',
		header: 'note',
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
						title="Xoá hoạt động bảo dưỡng/sửa chữa"
						description="Bạn có chắc chắn muốn xoá hoạt động bảo dưỡng/sửa chữa này"
						open={open}
						onOpenChange={setOpen}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
