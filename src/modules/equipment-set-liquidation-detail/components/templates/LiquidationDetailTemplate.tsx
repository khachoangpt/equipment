import PageTitle from '@/modules/common/components/molecules/PageTitle'
import LiquidationDetailView from '../organisms/LiquidationDetailView'

type Props = {
	id: string
}

const LiquidationDetailTemplate = ({ id }: Props) => {
	return (
		<div>
			<PageTitle title="Chi tiết hoạt động thanh lý" />
			<LiquidationDetailView id={id} />
		</div>
	)
}

export default LiquidationDetailTemplate
