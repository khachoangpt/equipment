import type { EquipmentInstance } from '@/client'
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

export const columns: ColumnDef<EquipmentInstance>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
	},
	{
		accessorKey: 'equipmentId',
		header: 'Tên',
		cell: ({ row }) => {
			return (
				<span className="text-right">{row.original.equipmentId?.name}</span>
			)
		},
	},
	{
		accessorKey: 'serialNumber',
		header: 'Mã hiệu serial',
	},
	{
		accessorKey: 'usingUnitId',
		header: 'Đơn vị sử dụng',
		cell: ({ row }) => {
			return (
				<span className="text-right">{row.original.usingUnitId?.name}</span>
			)
		},
	},
	{
		accessorKey: 'status',
		header: 'Tình trạng',
	},
	{
		accessorKey: 'qualityLevelId',
		header: 'Phân cấp chất lượng',
		cell: ({ row }) => {
			return (
				<span className="text-right">{row.original.qualityLevelId?.name}</span>
			)
		},
	},
	{
		accessorKey: 'entryDate',
		header: 'Ngày nhập',
		cell: ({ row }) =>
			new Date(row.original.entryDate).toLocaleDateString('vi-VN'),
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [open, setOpen] = useState<boolean>(false)
			const { mutate: remove } = useMutation({
				...equipmentInstancesControllerRemoveMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpen(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey: equipmentInstancesControllerSearchQueryKey(),
							})
						},
						onError: (error) => {
							setOpen(false)
							toast.error((error.response?.data as any)?.message)
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
