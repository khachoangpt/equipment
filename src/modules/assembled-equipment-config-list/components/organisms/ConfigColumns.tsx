'use client'

import {
	assembledEquipmentControllerFindAllConfigsQueryKey,
	assembledEquipmentControllerRemoveConfigMutation,
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
		cell: ({ row }) => {
			return <div>{row.index + 1}</div>
		},
	},
	{
		accessorKey: 'name',
		header: 'Tên',
	},
	{
		accessorKey: 'unitOfMeasure',
		header: 'Đơn vị tính',
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
			const { mutate: remove } = useMutation({
				...assembledEquipmentControllerRemoveConfigMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpen(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey: assembledEquipmentControllerFindAllConfigsQueryKey(),
							})
						},
						onError: () => {
							setOpen(false)
							toast.error('Xóa khônng thành công')
						},
					},
				)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Link
						href={
							pageList.assembledEquipmentConfigDetail({
								id: row.original._id,
							}).href
						}
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
						title="Xoá"
						description="Bạn có chắc chắn muốn xoá?"
						open={open}
						onOpenChange={setOpen}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
