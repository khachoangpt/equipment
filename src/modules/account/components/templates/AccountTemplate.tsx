'use client'

import { usersControllerFindAllOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { pageList } from '@/configs/routes'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { columns } from '../organisms/AccountTableColumns'

const AccountTemplate = () => {
	const router = useRouter()
	const { data: accounts } = useQuery({
		...usersControllerFindAllOptions(),
	})

	return (
		<div className="pb-10">
			<div className="text-center mb-10">
				<h3 className="font-bold text-3xl">Tài khoản</h3>
			</div>
			<div className="flex justify-between items-center mt-5">
				<div>
					<h5 className="font-bold text-lg">Danh sách tài khoản</h5>
				</div>
				<div className="flex items-center gap-x-2">
					<Button onClick={() => router.push(pageList.accountCreate.href)}>
						<Plus />
						Thêm
					</Button>
				</div>
			</div>
			<DataTable columns={columns} data={(accounts as any) ?? []} />
		</div>
	)
}

export default AccountTemplate
