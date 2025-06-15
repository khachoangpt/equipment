import PageTitle from '@/modules/common/components/molecules/PageTitle'
import EquipmentSetDetailForm from '../organisms/EquipmentSetDetailForm'

type Props = {
	id?: string
}

const EquipmentSetDetailTemplate = ({ id }: Props) => {
	const pageTitle = id ? 'Chỉnh sửa trang bị' : 'Khởi tạo trang bị'

	return (
		<div>
			<PageTitle title={pageTitle} />
			<EquipmentSetDetailForm id={id} />
		</div>
	)
}

export default EquipmentSetDetailTemplate
