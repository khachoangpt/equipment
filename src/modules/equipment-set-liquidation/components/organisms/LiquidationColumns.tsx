'use client'
import {
	equipmentDisposeControllerRemoveMutation,
	equipmentDisposeControllerSearchQueryKey,
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
		accessorKey: 'decisionNumber',
		header: 'Số quyết định',
	},
	// {
	// 	accessorKey: 'unitId',
	// 	header: 'Đơn vị',
	// 	cell: ({ row }) => row.original?.unitId?.name,
	// },
	{
		accessorKey: 'details.disposalDate',
		header: 'Thời gian',
		cell: ({ row }) =>
			new Date(row.original?.disposalDate as string).toLocaleDateString(
				'vi-VN',
			),
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
				...equipmentDisposeControllerRemoveMutation(),
			})

			const handleDelete = () => {
				setOpen(false)
				remove(
					{ path: { id: row.original._id } },
					{
						onError: (error) => {
							toast.error(
								<div
									dangerouslySetInnerHTML={{
										__html: (error.response?.data as any)?.message,
									}}
								/>,
							)
						},
						onSuccess: () => {
							toast.success('Xoá thành công')
							queryClient.invalidateQueries({
								queryKey: equipmentDisposeControllerSearchQueryKey(),
							})
						},
					},
				)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Link
						href={
							pageList.equipmentSetLiquidationDetail({ id: row.original._id })
								.href
						}
						className="text-green-600"
					>
						Chi tiết
					</Link>
					<Link
						href={
							pageList.equipmentSetLiquidationDetailUpdate({
								id: row.original._id,
							}).href
						}
						className="text-blue-600"
					>
						Sửa
					</Link>
					<p
						className="text-red-600 cursor-pointer"
						onClick={() => setOpen(true)}
					>
						Xoá
					</p>
					<DialogConfirmDelete
						title="Xoá hoạt động thanh lý"
						description="Bạn có chắc chắn muốn xoá hoạt động thanh lý này?"
						open={open}
						onOpenChange={setOpen}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
