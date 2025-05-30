'use client'

import { Card } from '@/components/ui/card'
import { accounts } from '@/mocks/account.mock'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useState } from 'react'
import { columns } from '../molecules/AccountTableColumns'

const AccountTemplate = () => {
	const [paginationState, setPaginationState] = useState({
		pageIndex: 0,
		pageSize: 10,
	})

	return (
		<div className="h-full">
			<Card className="gap-0 gap-y-2 px-5">
				<h3 className="font-bold text-2xl">Tài khoản</h3>
				<DataTable
					columns={columns}
					data={accounts}
					pageIndex={paginationState.pageIndex}
					pageSize={paginationState.pageSize}
					rowCount={accounts.length}
					onPaginationChange={setPaginationState}
				/>
			</Card>
		</div>
	)
}

export default AccountTemplate
