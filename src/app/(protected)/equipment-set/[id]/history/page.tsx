import EquipmentSetActivityLogs from '@/modules/equipment-set-detail/components/organisms/EquipmentSetActivityLogs'
import type { PageProps } from '@/types'

const EquipmentSetHistoryPage = async (props: PageProps<{ id: string }>) => {
	const { id } = await props.params
	return (
		<div className="pb-10">
			<div className="text-center">
				<h3 className="font-bold text-3xl">Lịch sử trang bị</h3>
			</div>
			<EquipmentSetActivityLogs id={id} />
		</div>
	)
}

export default EquipmentSetHistoryPage
