'use client'

import { pageList } from '@/configs/routes'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'assembledName',
		header: 'Tên trang bị',
	},
	{
		accessorKey: 'category',
		header: 'Loại/Nhóm',
	},
	{
		accessorKey: 'supplierUnit',
		header: 'Đơn vị cấp',
	},
	{
		accessorKey: 'receiverUnit',
		header: 'Đơn vị nhận',
	},
	{
		accessorKey: 'evaluationUnit',
		header: 'Đơn vị đánh giá',
	},
	{
		accessorKey: 'unit',
		header: 'Đơn vị tính',
	},
	{
		accessorKey: 'quantity',
		header: 'Số lượng',
	},
	{
		accessorKey: 'handoverDocumentNumber',
		header: 'Số Biên bản bàn giao',
	},
	{
		accessorKey: 'storageLocation',
		header: 'Vị trí lưu trữ',
	},
	{
		accessorKey: 'technicalFeatures',
		header: 'Tính năng kỹ thuật',
	},
	{
		accessorKey: 'notes',
		header: 'Ghi chú',
	},

	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [open, setOpen] = useState<boolean>(false)

			const handleDelete = () => {
				setOpen(false)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Link
						href={pageList.equipmentSetDetail({ id: row.original.id }).href}
						className="text-blue-600"
					>
						Chỉnh sửa
					</Link>
					<p
						className="text-red-600 cursor-pointer"
						onClick={() => setOpen(true)}
					>
						Xoá
					</p>
					<DialogConfirmDelete
						title="Xoá trang bị"
						description="Bạn có chắc chắn muốn xoá trang bị này"
						open={open}
						onOpenChange={setOpen}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
