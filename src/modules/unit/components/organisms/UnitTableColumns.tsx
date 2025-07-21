'use client'

import {
	unitsControllerFindAllQueryKey,
	unitsControllerRemoveMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import DialogConfirmDeleteUnit from './DialogConfirmDeleteUnit'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
		cell: ({ row }) => row.index + 1,
	},
	{
		accessorKey: 'name',
		header: 'Tên',
	},
	{
		accessorKey: 'parentId',
		header: 'Đơn vị chính',
		cell: ({ row }) => row.original.parentId?.name,
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [open, setOpen] = useState<boolean>(false)
			const { mutate: remove } = useMutation({
				...unitsControllerRemoveMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpen(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey: unitsControllerFindAllQueryKey(),
							})
						},
						onError: () => {
							toast.error('Xóa không thành công')
							setOpen(false)
						},
					},
				)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Link
						href={pageList.unitDetail({ id: row.original._id }).href}
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
					<DialogConfirmDeleteUnit
						open={open}
						onOpenChange={setOpen}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
