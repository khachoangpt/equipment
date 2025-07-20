import PageTitle from '@/modules/common/components/molecules/PageTitle'
import AssembledEquipmentDetailForm from '../organisms/AssembledEquimentDetailForm'

type Props = {
	id?: string
}

const AssembledEquipmentDetailTemplate = ({ id }: Props) => {
	const pageTitle = id
		? 'Chỉnh sửa trang bị lắp ghép'
		: 'Thêm trang bị lắp ghép'

	return (
		<div>
			<PageTitle title={pageTitle} />
			<AssembledEquipmentDetailForm id={id} />
		</div>
	)
}

export default AssembledEquipmentDetailTemplate
