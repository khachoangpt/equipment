'use client'
import {
	usersControllerFindAllQueryKey,
	usersControllerRemoveMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import { pageList } from '@/configs/routes'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import DialogConfirmDeleteAccount from './DialogConfirmDeleteAccount'

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'index',
		header: 'STT',
		cell: ({ row }) => {
			return <div>{row.index + 1}</div>
		},
	},
	{
		accessorKey: 'fullName',
		header: 'Tên',
	},
	{
		accessorKey: 'username',
		header: 'Tên đăng nhập',
	},
	{
		accessorKey: 'role',
		header: 'Vai trò',
	},
	{
		id: 'actions',
		enableResizing: false,
		size: 1,
		cell: ({ row }) => {
			const [open, setOpen] = useState<boolean>(false)
			const { mutate: remove } = useMutation({
				...usersControllerRemoveMutation(),
			})

			const handleDelete = () => {
				remove(
					{ path: { id: row.original._id } },
					{
						onSuccess: () => {
							setOpen(false)
							toast.success('Xóa tài khoản thành công')
							queryClient.invalidateQueries({
								queryKey: usersControllerFindAllQueryKey(),
							})
						},
						onError: (error) => {
							toast.error((error.response?.data as any)?.message)
							setOpen(false)
						},
					},
				)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Link
						href={pageList.accountDetail({ id: row.original._id }).href}
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
					<DialogConfirmDeleteAccount
						open={open}
						onOpenChange={setOpen}
						onConfirm={handleDelete}
					/>
				</div>
			)
		},
	},
]
