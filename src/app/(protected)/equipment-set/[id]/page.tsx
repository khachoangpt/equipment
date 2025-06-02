import EquipmentSetDetailTemplate from '@/modules/equipment-set-detail/components/templates/EquipmentSetDetailTemplate'
import type { PageProps } from '@/types'

const EquipmentSetDetailPage = async (props: PageProps<{ id: string }>) => {
	const params = await props.params

	return <EquipmentSetDetailTemplate id={params.id} />
}

export default EquipmentSetDetailPage
