'use client'
import {
	equipmentRepairControllerRemoveMutation,
	equipmentRepairControllerSearchQueryKey,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import DialogCompleteRepair from './DialogCompleteRepair'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
	},
	{
		id: 'reportNumber',
		accessorKey: 'details',
		header: 'Số biên bản',
		cell: ({ row }) => row.original?.reportNumber,
	},
	{
		id: 'repairLocation',
		accessorKey: 'details',
		header: 'Nơi bảo dưỡng',
		cell: ({ row }) => row.original?.repairLocation,
	},
	{
		id: 'repairDate',
		accessorKey: 'details',
		header: 'Ngày gửi',
		cell: ({ row }) =>
			row.original?.repairDate
				? new Date(row.original.repairDate as string).toLocaleDateString(
						'vi-VN',
					)
				: '',
	},
	{
		id: 'receivedDate',
		accessorKey: 'details',
		header: 'Ngày nhận',
		cell: ({ row }) =>
			row.original?.receivedDate
				? new Date(row.original.receivedDate as string).toLocaleDateString(
						'vi-VN',
					)
				: '',
	},
	{
		id: 'reason',
		accessorKey: 'details',
		header: 'Lý do',
		cell: ({ row }) => row.original?.reason,
	},
	// {
	// 	id: 'result',
	// 	accessorKey: 'details',
	// 	header: 'Kết quả',
	// 	cell: ({ row }) => row.original?.repairResult,
	// },
	// {
	// 	id: 'notes',
	// 	accessorKey: 'details',
	// 	header: 'Ghi chú',
	// 	cell: ({ row }) => (
	// 		<div className="whitespace-pre-wrap break-words max-w-[250px]">
	// 			{row.original?.notes as string}
	// 		</div>
	// 	),
	// },
	// {
	// 	id: 'comment',
	// 	accessorKey: 'details',
	// 	header: 'Nhận xét',
	// 	cell: ({ row }) => (
	// 		<div className="whitespace-pre-wrap break-words max-w-[250px]">
	// 			{row.original?.comment as string}
	// 		</div>
	// 	),
	// },
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [openDelete, setOpenDelete] = useState<boolean>(false)
			const [openComplete, setOpenComplete] = useState<boolean>(false)

			const { mutate: deleteRepair } = useMutation({
				...equipmentRepairControllerRemoveMutation(),
			})

			const handleDelete = () => {
				deleteRepair(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpenDelete(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey: equipmentRepairControllerSearchQueryKey(),
							})
						},
						onError: (error) => {
							setOpenDelete(false)
							toast.error(
								<div
									dangerouslySetInnerHTML={{
										__html: (error.response?.data as any)?.message,
									}}
								/>,
							)
						},
					},
				)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<p
						className="text-green-600 cursor-pointer"
						onClick={() => setOpenComplete(true)}
					>
						Hoàn thành
					</p>
					<Link
						href={
							pageList.equipmentSetMaintenanceDetailUpdate({
								id: row.original._id,
							}).href
						}
						className="text-blue-600"
					>
						Sửa
					</Link>
					<p
						className="text-red-600 cursor-pointer"
						onClick={() => setOpenDelete(true)}
					>
						Xoá
					</p>
					<DialogCompleteRepair
						open={openComplete}
						onOpenChange={setOpenComplete}
						repairId={row.original._id}
					/>
					<DialogConfirmDelete
						title="Xoá hoạt động bảo dưỡng/sửa chữa"
						description="Bạn có chắc chắn muốn xoá hoạt động bảo dưỡng/sửa chữa này?"
						open={openDelete}
						onOpenChange={setOpenDelete}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
