import PageTitle from '@/modules/common/components/molecules/PageTitle'
import AssembledEquipmentConfigForm from '../organisms/AssembledEquipmentConfigForm'

type Props = {
	id?: string
}

const AssembledEquipmentConfigTemplate = ({ id }: Props) => {
	const pageTitle = id
		? 'Chỉnh sửa cấu hình trang bị lắp ghép'
		: 'Thêm cấu hình trang bị lắp ghép'

	return (
		<div>
			<PageTitle title={pageTitle} />
			<AssembledEquipmentConfigForm id={id} />
		</div>
	)
}

export default AssembledEquipmentConfigTemplate
