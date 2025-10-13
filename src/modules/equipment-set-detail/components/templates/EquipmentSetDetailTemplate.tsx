import PageTitle from '@/modules/common/components/molecules/PageTitle'
import EquipmentSetDetailForm from '../organisms/EquipmentSetDetailForm'

type Props = {
	id?: string
	mode: 'create' | 'update' | 'detail'
}

const EquipmentSetDetailTemplate = ({ id, mode }: Props) => {
	let pageTitle = 'Thông tin trang bị'
	if (mode === 'create') {
		pageTitle = 'Thêm trang bị'
	}
	if (mode === 'update') {
		pageTitle = 'Chỉnh sửa trang bị'
	}

	return (
		<div>
			<PageTitle title={pageTitle} />
			<EquipmentSetDetailForm id={id} mode={mode} />
			{/* <EquipmentSetActivityLogs id={id} /> */}
		</div>
	)
}

export default EquipmentSetDetailTemplate
