import UnitDetailTemplate from '@/modules/unit-detail/components/templates/UnitDetailTemplate'
import type { PageProps } from '@/types'

const AccountDetailPage = async (props: PageProps<{ id: string }>) => {
	const params = await props.params

	return <UnitDetailTemplate id={params.id} />
}

export default AccountDetailPage
