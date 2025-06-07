import PageTitle from '@/modules/common/components/molecules/PageTitle'
import HandoverDetailForm from '../organisms/HandoverDetailForm'

type Props = {
	id?: string
}

const HandoverDetailTemplate = ({ id }: Props) => {
	const pageTitle = id
		? 'Chỉnh sửa hoạt động bàn giao'
		: 'Thêm hoạt động bàn giao'

	return (
		<div>
			<PageTitle title={pageTitle} />
			<HandoverDetailForm id={id} />
		</div>
	)
}

export default HandoverDetailTemplate
