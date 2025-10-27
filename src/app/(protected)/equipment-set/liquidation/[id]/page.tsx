import LiquidationDetailTemplate from '@/modules/equipment-set-liquidation-detail/components/templates/LiquidationDetailTemplate'

type Props = {
	params: {
		id: string
	}
}

const EquipmentSetLiquidationDetailPage = ({ params }: Props) => {
	return <LiquidationDetailTemplate id={params.id} />
}

export default EquipmentSetLiquidationDetailPage
