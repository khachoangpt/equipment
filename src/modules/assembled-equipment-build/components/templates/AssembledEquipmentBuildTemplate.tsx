import PageTitle from '@/modules/common/components/molecules/PageTitle'
import AssembledEquipmentBuildForm from '../organisms/AssembledEquipmentBuildForm'

type Props = {
	id?: string
}

const AssembledEquipmentBuildTemplate = ({ id }: Props) => {
	const pageTitle = id
		? 'Chỉnh sửa xây dựng trang bị lắp ghép'
		: 'Thêm xây dựng trang bị lắp ghép'

	return (
		<div>
			<PageTitle title={pageTitle} />
			<AssembledEquipmentBuildForm id={id} />
		</div>
	)
}

export default AssembledEquipmentBuildTemplate
