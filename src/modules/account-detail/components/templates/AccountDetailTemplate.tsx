import PageTitle from '@/modules/common/components/molecules/PageTitle'
import AccountDetailForm from '../organisms/AccountDetailForm'

type Props = {
	id?: string
}

const AccountDetailTemplate = ({ id }: Props) => {
	const pageTitle = id ? 'Chỉnh sửa tài khoản' : 'Tạo tài khoản'

	return (
		<div>
			<PageTitle title={pageTitle} />
			<AccountDetailForm id={id} />
		</div>
	)
}

export default AccountDetailTemplate
