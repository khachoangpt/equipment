'use client'

import {
	componentsControllerFindAllQueryKey,
	componentsControllerRemoveMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import DialogImportComponent from './DialogImportComponent'
import DialogImportHistoryComponent from './DialogImportHistoryComponent'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
	},
	{
		accessorKey: 'name',
		header: 'Tên',
	},
	{
		accessorKey: 'unitOfMeasure',
		header: 'Đơn vị đo',
	},
	{
		accessorKey: 'quantityInStock',
		header: 'Số lượng trong kho',
	},
	{
		accessorKey: 'storageLocation',
		header: 'Vị trí lưu trữ',
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [open, setOpen] = useState<boolean>(false)
			const [openHistory, setOpenHistory] = useState<boolean>(false)
			const [openDelete, setOpenDelete] = useState<boolean>(false)
			const { mutate: remove } = useMutation({
				...componentsControllerRemoveMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpenDelete(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey: componentsControllerFindAllQueryKey(),
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
					<div
						className="cursor-pointer text-gray-600"
						onClick={() => setOpenHistory(true)}
					>
						Lịch sử nhập
					</div>
					<div
						className="cursor-pointer text-primary"
						onClick={() => setOpen(true)}
					>
						Nhập thêm
					</div>
					<Link
						href={
							pageList.assembleEquipmentDetailComponent({
								id: row.original._id,
							}).href
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
					<DialogImportComponent
						id={row.original._id}
						open={open}
						onOpenChange={setOpen}
					/>
					<DialogConfirmDelete
						title="Xoá vật tư/linh kiện"
						description="Bạn có chắc chắn muốn xoá vật tư/linh kiện này"
						open={openDelete}
						onOpenChange={setOpenDelete}
						onConfirm={handleDelete}
					/>
					<DialogImportHistoryComponent
						id={row.original._id}
						open={openHistory}
						onOpenChange={setOpenHistory}
					/>
				</div>
			)
		},
	},
]
