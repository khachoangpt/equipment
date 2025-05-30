import { Card } from '@/components/ui/card'
import { accounts } from '@/mocks/account.mock'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { columns } from '../molecules/AccountTableColumns'

const AccountTemplate = () => {
	return (
		<div className="h-full">
			<Card className="gap-0 px-5">
				<h3 className="font-bold text-2xl">Tài khoản</h3>
				<DataTable columns={columns} data={accounts} />
			</Card>
		</div>
	)
}

export default AccountTemplate
