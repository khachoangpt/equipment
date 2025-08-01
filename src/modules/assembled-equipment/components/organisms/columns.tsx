'use client'

import {
	equipmentInstancesControllerRemoveMutation,
	equipmentInstancesControllerSearchQueryKey,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
	},
	{
		accessorKey: 'name',
		header: 'Tên trang bị',
	},
	// {
	// 	accessorKey: 'category',
	// 	header: 'Loại/Nhóm',
	// },
	{
		accessorKey: 'importingUnitId.name',
		header: 'Đơn vị cấp',
	},
	{
		accessorKey: 'usingUnitId.name',
		header: 'Đơn vị sử dụng',
	},
	{
		accessorKey: 'evaluatingUnitId.name',
		header: 'Đơn vị đánh giá',
	},
	{
		accessorKey: 'unitOfMeasure',
		header: 'Đơn vị tính',
	},
	// {
	// 	accessorKey: 'quantity',
	// 	header: 'Số lượng',
	// },
	// {
	// 	accessorKey: 'handoverDocumentNumber',
	// 	header: 'Số Biên bản bàn giao',
	// },
	// {
	// 	accessorKey: 'storageLocation',
	// 	header: 'Vị trí lưu trữ',
	// },
	// {
	// 	accessorKey: 'technicalFeatures',
	// 	header: 'Tính năng kỹ thuật',
	// },
	// {
	// 	accessorKey: 'notes',
	// 	header: 'Ghi chú',
	// },

	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [openDelete, setOpenDelete] = useState<boolean>(false)
			const { mutate: remove } = useMutation({
				...equipmentInstancesControllerRemoveMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpenDelete(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey: equipmentInstancesControllerSearchQueryKey(),
							})
						},
						onError: (error) => {
							setOpenDelete(false)
							toast.error((error.response?.data as any)?.message)
						},
					},
				)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Link
						href={
							pageList.assembleEquipmentDetail({ id: row.original._id }).href
						}
						className="text-blue-600"
					>
						Chỉnh sửa
					</Link>
					<p
						className="text-red-600 cursor-pointer"
						onClick={() => setOpenDelete(true)}
					>
						Xoá
					</p>

					<DialogConfirmDelete
						title="Xoá trang bị"
						description="Bạn có chắc chắn muốn xoá trang bị này"
						open={openDelete}
						onOpenChange={setOpenDelete}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
