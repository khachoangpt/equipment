'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import { accounts } from '@/mocks/account.mock'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { columns } from '../organisms/AccountTableColumns'

const AccountTemplate = () => {
	const router = useRouter()
	const [paginationState, setPaginationState] = useState({
		pageIndex: 0,
		pageSize: 10,
	})

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-2xl">Tài khoản</h3>
					<Button onClick={() => router.push(pageList.accountCreate.href)}>
						<Plus />
						Thêm tài khoản
					</Button>
				</div>
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
