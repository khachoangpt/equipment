import PageTitle from '@/modules/common/components/molecules/PageTitle'
import AccountDetailForm from '../organisms/UnitDetailForm'

type Props = {
	id?: string
}

const UnitDetailTemplate = ({ id }: Props) => {
	const pageTitle = id ? 'Chỉnh sửa đơn vị' : 'Thêm đơn vị'

	return (
		<div>
			<PageTitle title={pageTitle} />
			<AccountDetailForm id={id} />
		</div>
	)
}

export default UnitDetailTemplate
