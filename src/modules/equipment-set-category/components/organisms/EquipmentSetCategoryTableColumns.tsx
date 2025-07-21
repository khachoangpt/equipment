'use client'
import type { Equipment } from '@/client'
import {
	syncEquipmentControllerFindAllQueryKey,
	syncEquipmentControllerRemoveMutation,
	syncEquipmentControllerUpdateMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import type { CategoryEquipmentSetDetailSchema } from '@/configs/schema'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import DialogAddCategoryEquipmentSet from './DialogAddCategoryEquipmentSet'

export const columns: ColumnDef<Equipment>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
		cell: ({ row }) => {
			return <div>{row.index + 1}</div>
		},
	},
	{
		accessorKey: 'name',
		header: 'Tên',
	},
	{
		accessorKey: 'groupId',
		header: 'Nhóm loại',
		cell: ({ row }) => row.original.groupId?.name,
	},
	{
		accessorKey: 'field',
		header: 'Lĩnh vực',
	},
	{
		accessorKey: 'initialPrice',
		header: 'Giá tiền ban đầu',
		cell: ({ row }) => (
			<span className="text-right">
				{row.original.initialPrice?.toLocaleString('vi-VN', {
					style: 'currency',
					currency: 'VND',
				})}
			</span>
		),
	},
	{
		accessorKey: 'createdAt',
		header: 'Ngày tạo',
		cell: ({ row }) =>
			new Date(row.original.createdAt).toLocaleDateString('vi-VN'),
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [openDelete, setOpenDelete] = useState<boolean>(false)
			const [openDetail, setOpenDetail] = useState<boolean>(false)
			const { mutate: update } = useMutation({
				...syncEquipmentControllerUpdateMutation(),
			})
			const { mutate: remove } = useMutation({
				...syncEquipmentControllerRemoveMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpenDelete(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey: syncEquipmentControllerFindAllQueryKey(),
							})
						},
						onError: () => {
							toast.error('Xóa không thành công')
							setOpenDelete(false)
						},
					},
				)
			}

			const handleEdit: SubmitHandler<CategoryEquipmentSetDetailSchema> = (
				data,
			) => {
				update(
					{
						body: {
							name: data.name,
							groupId: data.type,
							field: data.field,
							initialPrice: data.defaultAmount,
							notes: data.note,
						},
						path: { id: row.original._id },
					},
					{
						onError: () => {
							toast.error('Cập nhật không thành công')
							setOpenDetail(false)
						},
						onSuccess: () => {
							toast.success('Cập nhật thành công')
							queryClient.invalidateQueries({
								queryKey: syncEquipmentControllerFindAllQueryKey(),
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
						<DialogAddCategoryEquipmentSet
							open={openDetail}
							onOpenChange={setOpenDetail}
							id={row.original._id}
							onConfirm={handleEdit}
						/>
					)}
				</div>
			)
		},
	},
]
