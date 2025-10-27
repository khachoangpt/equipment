'use client'
import {
	equipmentHandoverControllerDeleteMutation,
	equipmentHandoverControllerGenerateHandoverReportFromLogMutation,
	equipmentHandoverControllerSearchQueryKey,
} from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
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
		id: 'reportNumber',
		accessorKey: 'details',
		header: 'Số biên bản',
		cell: ({ row }) => {
			return row.original?.reportNumber
		},
	},
	{
		id: 'sender',
		accessorKey: 'details',
		header: 'Đơn vị giao',
		cell: ({ row }) => row.original.fromUnitId?.name,
	},
	{
		id: 'receiver',
		accessorKey: 'details',
		header: 'Đơn vị nhận',
		cell: ({ row }) => row.original.toUnitId?.name,
	},
	{
		id: 'sender',
		accessorKey: 'details',
		header: 'Người giao',
		cell: ({ row }) => row.original.sender,
	},
	{
		id: 'receiver',
		accessorKey: 'details',
		header: 'Người nhận',
		cell: ({ row }) => row.original.receiver,
	},
	{
		id: 'handoverDate',
		accessorKey: 'details',
		header: 'Ngày giao',
		cell: ({ row }) =>
			new Date(row.original?.handoverDate).toLocaleDateString('vi-VN'),
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [openDelete, setOpenDelete] = useState<boolean>(false)

			const { mutateAsync: generateReport, isPending: isGeneratingReport } =
				useMutation({
					...equipmentHandoverControllerGenerateHandoverReportFromLogMutation(),
				})

			const { mutate: deleteHandover } = useMutation({
				...equipmentHandoverControllerDeleteMutation(),
			})

			const handleGenerateReport = async () => {
				const res = await generateReport({
					path: { id: row.original._id },
					responseType: 'arraybuffer',
				})

				handleDownload(
					res as string,
					`Bien_ban_ban_giao_${row.original.reportNumber}.xlsx`,
				)
			}

			const handleDelete = () => {
				deleteHandover(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpenDelete(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey: equipmentHandoverControllerSearchQueryKey(),
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
					<Button
						variant={'ghost'}
						disabled={isGeneratingReport}
						onClick={handleGenerateReport}
						className="text-amber-700 p-0 cursor-pointer font-normal"
					>
						Xuất Excel
					</Button>
					<Link
						href={
							pageList.equipmentSetHandoverDetail({ id: row.original._id }).href
						}
						className="text-green-600"
					>
						Chi tiết
					</Link>
					<Link
						href={
							pageList.equipmentSetHandoverDetailUpdate({
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
					<DialogConfirmDelete
						title="Xoá hoạt động bàn giao"
						description="Bạn có chắc chắn muốn xoá hoạt động bàn giao này"
						open={openDelete}
						onOpenChange={setOpenDelete}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]

const handleDownload = (excelContent: string, fileName = 'document.xlsx') => {
	const blob = new Blob([excelContent], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml+xml',
	})
	const url = URL.createObjectURL(blob)

	const link = document.createElement('a')
	link.href = url
	link.download = fileName
	link.click()

	URL.revokeObjectURL(url)
}
