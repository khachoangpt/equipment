import PageTitle from '@/modules/common/components/molecules/PageTitle'
import LiquidationDetailForm from '../organisms/LiquidationDetailForm'

type Props = {
	id: string
}

const LiquidationUpdateTemplate = ({ id }: Props) => {
	return (
		<div>
			<PageTitle title="Chỉnh sửa hoạt động thanh lý" />
			<LiquidationDetailForm id={id} />
		</div>
	)
}

export default LiquidationUpdateTemplate
