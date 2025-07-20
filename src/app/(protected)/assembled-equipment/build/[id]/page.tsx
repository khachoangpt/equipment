import AssembledEquipmentBuildTemplate from '@/modules/assembled-equipment-build/components/templates/AssembledEquipmentBuildTemplate'
import type { PageProps } from '@/types'

const DetailBuildPage = async (props: PageProps<{ id: string }>) => {
	const params = await props.params

	return <AssembledEquipmentBuildTemplate id={params.id} />
}
export default DetailBuildPage
