import AccountDetailTemplate from '@/modules/account-detail/components/templates/AccountDetailTemplate'
import type { PageProps } from '@/types'

const AccountDetailPage = async (props: PageProps<{ id: string }>) => {
	const params = await props.params

	return <AccountDetailTemplate id={params.id} />
}

export default AccountDetailPage
