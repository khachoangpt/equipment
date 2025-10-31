import LiquidationUpdateTemplate from '@/modules/equipment-set-liquidation-detail/components/templates/LiquidationUpdateTemplate'
import type { PageProps } from '@/types'

const LiquidationUpdatePage = async (props: PageProps<{ id: string }>) => {
	const params = await props.params

	return <LiquidationUpdateTemplate id={params.id} />
}

export default LiquidationUpdatePage
