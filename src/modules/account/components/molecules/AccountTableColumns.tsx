'use client'

import type { Account } from '@/types/account.types'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, Trash2 } from 'lucide-react'

export const columns: ColumnDef<Account>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
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
		size: 0,
		cell: () => {
			return (
				<div className="flex items-center justify-end gap-x-3">
					<Edit className="text-teal-600 w-5 h-5 cursor-pointer" />
					<Trash2 className="text-red-600 w-5 h-5 cursor-pointer" />
				</div>
			)
		},
	},
]
