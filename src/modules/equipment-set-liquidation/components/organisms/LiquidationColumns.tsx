'use client'
import {
	equipmentDisposeControllerGenerateLiquidationFormLayoutMutation,
	equipmentDisposeControllerRemoveMutation,
	equipmentDisposeControllerSearchQueryKey,
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

			const { mutateAsync: generateLiquidationForm } = useMutation({
				...equipmentDisposeControllerGenerateLiquidationFormLayoutMutation(),
			})

			const handleGenerateReport = async () => {
				const res = await generateLiquidationForm({
					query: {
						decisionNumber: row.original.decisionNumber,
					},
					responseType: 'arraybuffer',
				})

				handleDownload(
					res as string,
					`Phieu_thanh_ly_${row.original?.decisionNumber || ''}.pdf`,
				)
			}

			const handleDownload = (
				excelContent: string,
				fileName = 'document.pdf',
			) => {
				const blob = new Blob([excelContent], {
					type: 'application/pdf',
				})
				const url = URL.createObjectURL(blob)

				const link = document.createElement('a')
				link.href = url
				link.download = fileName
				link.click()

				URL.revokeObjectURL(url)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Button
						variant={'ghost'}
						className="text-amber-700 p-0 cursor-pointer font-normal"
						onClick={handleGenerateReport}
					>
						Xuất PDF
					</Button>
					<Link
						href={
							pageList.equipmentSetLiquidationDetailUpdate({
								id: row.original.decisionNumber,
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
