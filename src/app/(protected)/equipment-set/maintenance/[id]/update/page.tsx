import MaintenanceDetailTemplate from '@/modules/equipment-set-maintenance-detail/components/templates/MaintenanceCreateTemplate'
import type { PageProps } from '@/types'

const EquipmentSetMaintenanceUpdatePage = async ({
	params,
}: PageProps<{ id: string }>) => {
	const { id } = await params

	return <MaintenanceDetailTemplate id={id} />
}
export default EquipmentSetMaintenanceUpdatePage
