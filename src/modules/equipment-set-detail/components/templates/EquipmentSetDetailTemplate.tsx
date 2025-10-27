import PageTitle from '@/modules/common/components/molecules/PageTitle'
import EquipmentSetDetailForm from '../organisms/EquipmentSetDetailForm'

type Props = {
	id?: string
	mode: 'create' | 'update' | 'detail'
}

const EquipmentSetDetailTemplate = ({ id, mode }: Props) => {
	let pageTitle = 'Thông tin trang bị đồng bộ'
	if (mode === 'create') {
		pageTitle = 'Thêm trang bị đồng bộ'
	}
	if (mode === 'update') {
		pageTitle = 'Chỉnh sửa trang bị đồng bộ'
	}

	return (
		<div>
			<PageTitle title={pageTitle} />
			<EquipmentSetDetailForm id={id} mode={mode} />
		</div>
	)
}

export default EquipmentSetDetailTemplate
