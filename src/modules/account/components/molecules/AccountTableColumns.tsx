'use client'

import type { Account } from '@/types/account.types'
import type { ColumnDef } from '@tanstack/react-table'
import {} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import DialogConfirmDeleteAccount from '../organisms/DialogConfirmDeleteAccount'

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
		cell: () => {
			const [open, setOpen] = useState<boolean>(false)

			const handleDelete = () => {
				setOpen(false)
			}

			return (
				<div className="flex items-center justify-end gap-x-3">
					<Link href={'/account/1/edit'} className="text-blue-600">
						Edit
					</Link>
					<p
						className="text-red-600 cursor-pointer"
						onClick={() => setOpen(true)}
					>
						Delete
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
