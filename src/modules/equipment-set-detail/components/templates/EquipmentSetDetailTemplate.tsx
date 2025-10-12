import PageTitle from '@/modules/common/components/molecules/PageTitle'
import EquipmentSetDetailForm from '../organisms/EquipmentSetDetailForm'

type Props = {
	id?: string
	isUpdate?: boolean
}

const EquipmentSetDetailTemplate = ({ id, isUpdate }: Props) => {
	let pageTitle = 'Thông tin trang bị'
	if (!id) {
		pageTitle = 'Thêm trang bị'
	}
	if (isUpdate && id) {
		pageTitle = 'Chỉnh sửa trang bị'
	}

	return (
		<div>
			<PageTitle title={pageTitle} />
			<EquipmentSetDetailForm id={id} isUpdate={isUpdate} />
			{/* <EquipmentSetActivityLogs id={id} /> */}
		</div>
	)
}

export default EquipmentSetDetailTemplate
