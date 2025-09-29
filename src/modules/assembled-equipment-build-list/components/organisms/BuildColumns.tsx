'use client'

import { AssemblyEquipmentsComponentsService } from '@/client'
import {
	assembledEquipmentControllerFindAllBuildActivitiesQueryKey,
	assembledEquipmentControllerRemoveBuildActivityMutation,
} from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import { COOKIES } from '@/constants'
import DialogConfirmDelete from '@/modules/common/components/organisms/DialogConfirmDelete'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { getCookie } from 'cookies-next/client'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
	},
	{
		accessorKey: 'config.name',
		header: 'Tên',
	},
	{
		accessorKey: 'quantity',
		header: 'Số lượng',
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
				...assembledEquipmentControllerRemoveBuildActivityMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpen(false)
							toast.success('Xóa thành công')
							queryClient.invalidateQueries({
								queryKey:
									assembledEquipmentControllerFindAllBuildActivitiesQueryKey(),
							})
						},
						onError: (error) => {
							setOpen(false)
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

			const handleGenerateReport = async (id: string) => {
				const jwt = getCookie(COOKIES.JWT)
				const { data: res } =
					await AssemblyEquipmentsComponentsService.assembledEquipmentControllerGenerateAssemblyCheckPdf(
						{
							path: { id },
							responseType: 'arraybuffer',
							baseURL: process.env.NEXT_PUBLIC_API_URL,
							headers: { Authorization: `Bearer ${jwt}` },
							throwOnError: false,
						},
					)

				handleDownload(
					res as string,
					`Bao_cao_trang_bi_lap_ghep_${row.original._id}.xlsx`,
				)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Button
						variant={'ghost'}
						onClick={() => handleGenerateReport(row.original._id)}
						className="text-green-600 cursor-pointer p-0"
					>
						Xuất Excel
					</Button>
					<Link
						href={
							pageList.assembledEquipmentBuildDetail({
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
