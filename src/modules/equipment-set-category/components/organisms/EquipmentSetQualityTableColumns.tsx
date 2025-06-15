'use client'

import {
	qualityLevelsControllerFindAllQueryKey,
	qualityLevelsControllerRemoveMutation,
	qualityLevelsControllerUpdateMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import type { QualityDetailSchema } from '@/configs/schema'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import DialogAddQuality from './DialogAddQuality'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'name',
		header: 'Tên phân cấp',
	},
	{
		accessorKey: 'code',
		header: 'Mã phân cấp',
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
			const { mutate: remove } = useMutation({
				...qualityLevelsControllerRemoveMutation(),
			})
			const { mutate: update } = useMutation({
				...qualityLevelsControllerUpdateMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpenDelete(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey: qualityLevelsControllerFindAllQueryKey(),
							})
						},
						onError: () => {
							toast.error('Xóa không thành công')
							setOpenDelete(false)
						},
					},
				)
			}

			const handleConfirmEdit: SubmitHandler<QualityDetailSchema> = (data) => {
				update(
					{
						body: { code: data.code, name: data.name, note: data.note },
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
								queryKey: qualityLevelsControllerFindAllQueryKey(),
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
						<DialogAddQuality
							open={openDetail}
							onOpenChange={setOpenDetail}
							id={row.original._id}
							onConfirm={handleConfirmEdit}
						/>
					)}
				</div>
			)
		},
	},
]
