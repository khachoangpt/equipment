import AssembledEquipmentConfigTemplate from '@/modules/assembled-equipment-config/components/templates/AssembledEquipmentConfigTemplate'
import type { PageProps } from '@/types'

const DetailConfigPage = async (props: PageProps<{ id: string }>) => {
	const params = await props.params

	return <AssembledEquipmentConfigTemplate id={params.id} />
}
export default DetailConfigPage
