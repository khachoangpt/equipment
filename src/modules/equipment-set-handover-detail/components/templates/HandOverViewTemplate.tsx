import PageTitle from '@/modules/common/components/molecules/PageTitle'
import HandoverViewForm from '../organisms/HandoverViewForm'

type Props = {
	id: string
}

const HandoverViewTemplate = ({ id }: Props) => {
	return (
		<div>
			<PageTitle title="Chi tiết hoạt động bàn giao" />
			<HandoverViewForm id={id} />
		</div>
	)
}

export default HandoverViewTemplate
