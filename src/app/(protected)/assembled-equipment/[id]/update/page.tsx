import AssembledEquipmentDetailTemplate from '@/modules/assembled-equipment-detail/components/templates/AssembledEquipmentDetailTemplate'
import type { PageProps } from '@/types'

const AssembledEquipmentDetailPage = async (
	props: PageProps<{ id: string }>,
) => {
	const params = await props.params

	return <AssembledEquipmentDetailTemplate id={params.id} mode="update" />
}

export default AssembledEquipmentDetailPage
