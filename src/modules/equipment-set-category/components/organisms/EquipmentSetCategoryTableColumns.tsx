'use client'
import type { CategoryEquipmentSetDetailSchema } from '@/configs/schema'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import type { EquipmentSetCategory } from '@/types/equipment-set.types'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import DialogAddCategoryEquipmentSet from './DialogAddCategoryEquipmentSet'

export const columns: ColumnDef<EquipmentSetCategory>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		enableResizing: false,
		size: 1,
	},
	{
		accessorKey: 'name',
		header: 'Tên',
	},
	{
		accessorKey: 'type',
		header: 'Nhóm loại',
	},
	{
		accessorKey: 'field',
		header: 'Lĩnh vực',
	},
	{
		accessorKey: 'defaultAmount',
		header: 'Giá tiền ban đầu',
		cell: (info) => (
			<span>
				{Intl.NumberFormat('vi-VN').format(info.row.original.defaultAmount)}
			</span>
		),
	},
	{
		accessorKey: 'note',
		header: 'Ghi chú',
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [openDelete, setOpenDelete] = useState<boolean>(false)
			const [openDetail, setOpenDetail] = useState<boolean>(false)

			const handleDelete = () => {
				setOpenDelete(false)
			}

			const handleEdit: SubmitHandler<
				CategoryEquipmentSetDetailSchema
			> = () => {
				setOpenDetail(false)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<p
						className="text-blue-600 cursor-pointer"
						onClick={() => setOpenDetail(true)}
					>
						Chỉnh sửa
					</p>
					<p
						className="text-red-600 cursor-pointer"
						onClick={() => setOpenDelete(true)}
					>
						Xoá
					</p>
					<DialogConfirmDelete
						description="Bạn chắc chắn muốn xoá danh mục này?"
						title="Xác nhận xóa danh mục"
						open={openDelete}
						onOpenChange={setOpenDelete}
						onConfirm={handleDelete}
					/>
					<DialogAddCategoryEquipmentSet
						open={openDetail}
						onOpenChange={setOpenDetail}
						id={row.original.id}
						onConfirm={handleEdit}
					/>
				</div>
			)
		},
	},
]
