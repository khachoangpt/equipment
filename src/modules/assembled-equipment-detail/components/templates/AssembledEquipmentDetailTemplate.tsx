import PageTitle from '@/modules/common/components/molecules/PageTitle'
import AssembledEquipmentDetailForm from '../organisms/AssembledEquimentDetailForm'

type Props = {
	id?: string
	mode: 'create' | 'update' | 'detail'
}

const AssembledEquipmentDetailTemplate = ({ id, mode }: Props) => {
	let pageTitle = 'Chỉnh sửa trang bị lắp ghép'
	if (mode === 'create') {
		pageTitle = 'Thêm trang bị lắp ghép'
	}
	if (mode === 'detail') {
		pageTitle = 'Chi tiết trang bị lắp ghép'
	}

	return (
		<div>
			<PageTitle title={pageTitle} />
			<AssembledEquipmentDetailForm id={id} mode={mode} />
		</div>
	)
}

export default AssembledEquipmentDetailTemplate
