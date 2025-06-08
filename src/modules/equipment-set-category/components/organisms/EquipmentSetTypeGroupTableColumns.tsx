'use client'

import {
	categoriesControllerFindAllQueryKey,
	categoriesControllerRemoveMutation,
	categoriesControllerUpdateMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import type { TypeGroupDetailSchema } from '@/configs/schema'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import DialogAddTypeGroup from './DialogAddTypeGroup'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'name',
		header: 'Tên',
	},
	{
		accessorKey: 'code',
		header: 'Mã nhóm',
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
			const [openDelete, setOpenDelete] = useState<boolean>(false)
			const [openDetail, setOpenDetail] = useState<boolean>(false)
			const { mutate: remove } = useMutation({
				...categoriesControllerRemoveMutation(),
			})
			const { mutate: update } = useMutation({
				...categoriesControllerUpdateMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpenDelete(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey: categoriesControllerFindAllQueryKey({
									query: { type: 'EQUIPMENT_GROUP' },
								}),
							})
						},
						onError: () => {
							toast.error('Xóa không thành công')
							setOpenDelete(false)
						},
					},
				)
			}

			const handleConfirmEdit: SubmitHandler<TypeGroupDetailSchema> = (
				data,
			) => {
				update(
					{
						body: { code: data.code, name: data.name, notes: data.note },
						path: { id: row.original._id },
					},
					{
						onError: () => {
							toast.error('Chỉnh sửa khônng thành công')
							setOpenDetail(false)
						},
						onSuccess: () => {
							toast.success('Chình sửa thành công')
							queryClient.invalidateQueries({
								queryKey: categoriesControllerFindAllQueryKey({
									query: { type: 'EQUIPMENT_GROUP' },
								}),
							})
							setOpenDetail(false)
						},
					},
				)
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

					{row.original._id && openDetail && (
						<DialogAddTypeGroup
							id={row.original._id}
							open={openDetail}
							onOpenChange={setOpenDetail}
							onConfirm={handleConfirmEdit}
						/>
					)}
				</div>
			)
		},
	},
]
