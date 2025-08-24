'use client'
import PageTitle from '@/modules/common/components/molecules/PageTitle'
import ComponentDetailForm from '../organisms/ComponentDetailForm'

type Props = {
	id?: string
}

const ComponentDetailTemplate = ({ id }: Props) => {
	const pageTitle = id
		? 'Chỉnh sửa vật tư/ linh kiện'
		: 'Thêm vật tư/ linh kiện'

	return (
		<div>
			<PageTitle title={pageTitle} />
			<ComponentDetailForm id={id} />
		</div>
	)
}

export default ComponentDetailTemplate
