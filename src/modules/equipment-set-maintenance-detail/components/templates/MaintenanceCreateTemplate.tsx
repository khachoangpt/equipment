import PageTitle from '@/modules/common/components/molecules/PageTitle'
import MaintenanceDetailForm from '../organisms/MaintenanceDetailForm'

type Props = {
	id?: string
}

const MaintenanceDetailTemplate = ({ id }: Props) => {
	const pageTitle = id
		? 'Chỉnh sửa hoạt động sửa chữa'
		: 'Thêm hoạt động sửa chữa'

	return (
		<div>
			<PageTitle title={pageTitle} />
			<MaintenanceDetailForm id={id} />
		</div>
	)
}

export default MaintenanceDetailTemplate
