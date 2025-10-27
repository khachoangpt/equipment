import LiquidationUpdateTemplate from '@/modules/equipment-set-liquidation-detail/components/templates/LiquidationUpdateTemplate'

type Props = {
	params: {
		id: string
	}
}

const LiquidationUpdatePage = ({ params }: Props) => {
	return <LiquidationUpdateTemplate id={params.id} />
}

export default LiquidationUpdatePage
