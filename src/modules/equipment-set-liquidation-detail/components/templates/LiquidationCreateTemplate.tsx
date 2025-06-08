import PageTitle from '@/modules/common/components/molecules/PageTitle'
import LiquidationDetailForm from '../organisms/LiquidationDetailForm'

type Props = {
	id?: string
}

const LiquidationDetailTemplate = ({ id }: Props) => {
	const pageTitle = id
		? 'Chỉnh sửa hoạt động thanh lý'
		: 'Thêm hoạt động thanh lý'

	return (
		<div>
			<PageTitle title={pageTitle} />
			<LiquidationDetailForm id={id} />
		</div>
	)
}

export default LiquidationDetailTemplate
