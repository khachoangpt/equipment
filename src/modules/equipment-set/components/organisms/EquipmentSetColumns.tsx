import { pageList } from '@/configs/routes'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import type { EquipmentSet } from '@/types/equipment-set.types'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'

export const columns: ColumnDef<EquipmentSet>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		enableResizing: false,
		size: 1,
	},
	{
		accessorKey: 'name',
		header: 'Trang bị',
	},
	{
		accessorKey: 'serial',
		header: 'Mã hiệu serial',
	},
	{
		accessorKey: 'importDate',
		header: 'Ngày nhập',
	},
	{
		accessorKey: 'amount',
		header: 'Giá tiền hiện tại',
		cell: ({ row }) => {
			return (
				<span className="text-right">
					{row.original.amount.toLocaleString('vi-VN', {
						style: 'currency',
						currency: 'VND',
					})}
				</span>
			)
		},
	},
	{
		accessorKey: 'importUnit',
		header: 'Đơn vị nhập',
	},
	{
		accessorKey: 'quality',
		header: 'Phân cấp chất lượng',
	},
	{
		accessorKey: 'status',
		header: 'Tình trạng trang bị',
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
