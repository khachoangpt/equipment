import LiquidationDetailTemplate from '@/modules/equipment-set-liquidation-detail/components/templates/LiquidationDetailTemplate'
import type { PageProps } from '@/types'

const EquipmentSetLiquidationDetailPage = async (
	props: PageProps<{ id: string }>,
) => {
	const params = await props.params

	return <LiquidationDetailTemplate id={params.id} />
}

export default EquipmentSetLiquidationDetailPage
