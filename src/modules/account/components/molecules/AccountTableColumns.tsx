'use client'

import type { Account } from '@/types/account.types'
import type { ColumnDef } from '@tanstack/react-table'

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
		header: 'Quyền',
	},
]
