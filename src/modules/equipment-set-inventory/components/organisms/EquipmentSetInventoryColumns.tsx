import { qualityLevelsControllerFindAllOptions } from '@/client/@tanstack/react-query.gen'
import { pageList } from '@/configs/routes'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import UpdateInventoryDialog from './UpdateInventoryDialog'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
	},
	{
		accessorKey: 'instanceId',
		header: 'Tên',
		cell: ({ row }) => {
			return (
				<Link
					href={
						pageList.equipmentSetDetail({
							id: row.original?._id ?? '',
						}).href
					}
					className="text-right"
				>
					{row.original?.instance?.name}
				</Link>
			)
		},
	},
	{
		accessorKey: 'instance.serialNumber',
		header: 'Mã hiệu serial',
	},
	{
		accessorKey: 'usingUnitId',
		header: 'Đơn vị sử dụng',
		cell: ({ row }) => {
			return (
				<span className="text-right">
					{row.original?.instance?.usingUnitId?.name}
				</span>
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
			const { data: qualityLevels } = useQuery({
				...qualityLevelsControllerFindAllOptions({
					query: {
						limit: 1000,
						page: 1,
					},
				}),
				select: (data) => {
					return data?.data
						?.slice()
						?.sort((a, b) => a.name.localeCompare(b.name))
				},
			})
			return (
				<span className="text-right">
					{
						qualityLevels?.find(
							(item) => item.code === row.original?.qualityLevelId,
						)?.name
					}
				</span>
			)
		},
	},
	{
		accessorKey: 'quantity',
		header: 'Số lượng',
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [open, setOpen] = useState<boolean>(false)
			const { data: qualityLevels } = useQuery({
				...qualityLevelsControllerFindAllOptions({
					query: {
						limit: 1000,
						page: 1,
					},
				}),
			})
			const qualityLevel = qualityLevels?.data?.find(
				(item) => item.code === row.original.qualityLevelId,
			)

			return (
				<div className="flex items-center justify-end gap-x-3">
					<button
						type="button"
						className="text-blue-600 cursor-pointer"
						onClick={() => setOpen(true)}
					>
						Cập nhật kiểm kê
					</button>
					<UpdateInventoryDialog
						equipmentId={row.original._id}
						currentStatus={row.original.status}
						currentQualityLevelId={qualityLevel?._id}
						open={open}
						onOpenChange={setOpen}
					/>
				</div>
			)
		},
	},
]
