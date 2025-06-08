import {
	syncEquipmentControllerFindAllQueryKey,
	syncEquipmentControllerRemoveMutation,
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
		accessorKey: 'name',
		header: 'Trang bị',
	},
	{
		accessorKey: 'serialNumber',
		header: 'Mã hiệu serial',
	},
	{
		accessorKey: 'group',
		header: 'Nhóm/loại',
		cell: ({ row }) => {
			return <span className="text-right">{row.original.group?.name}</span>
		},
	},
	{
		accessorKey: 'initialPrice',
		header: 'Giá tiền',
		cell: ({ row }) => {
			return (
				<span className="text-right">
					{(row.original.initialPrice ?? 0).toLocaleString('vi-VN', {
						style: 'currency',
						currency: 'VND',
					})}
				</span>
			)
		},
	},
	{
		accessorKey: 'qualityLevel',
		header: 'Phân cấp chất lượng',
		cell: ({ row }) => {
			return (
				<span className="text-right">{row.original.qualityLevel?.name}</span>
			)
		},
	},
	{
		accessorKey: 'status',
		header: 'Tình trạng trang bị',
	},
	{
		accessorKey: 'currentUnit',
		header: 'Đơn vị hiện tại',
		cell: ({ row }) => {
			return (
				<span className="text-right">{row.original.currentUnit?.name}</span>
			)
		},
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [open, setOpen] = useState<boolean>(false)
			const { mutate: remove } = useMutation({
				...syncEquipmentControllerRemoveMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpen(false)
							toast.success('Xóa trang bị thành công')
							queryClient.invalidateQueries({
								queryKey: syncEquipmentControllerFindAllQueryKey(),
							})
						},
						onError: () => {
							setOpen(false)
							toast.error('Xóa trang bị khônng thành công')
						},
					},
				)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Link
						href={pageList.equipmentSetDetail({ id: row.original._id }).href}
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
						title="Xoá trang bị"
						description="Bạn có chắc chắn muốn xoá trang bị này"
						open={open}
						onOpenChange={setOpen}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
