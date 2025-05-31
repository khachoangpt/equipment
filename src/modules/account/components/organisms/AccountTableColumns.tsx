'use client'

import { pageList } from '@/configs/routes'
import type { Account } from '@/types/account.types'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import DialogConfirmDeleteAccount from './DialogConfirmDeleteAccount'

export const columns: ColumnDef<Account>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		enableResizing: false,
		size: 1,
	},
	{
		accessorKey: 'name',
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

			const handleDelete = () => {
				setOpen(false)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Link
						href={pageList.accountDetail({ id: row.original.id }).href}
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
