'use client'

import { activityLogsControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import { Card } from '@/components/ui/card'
import PageTitle from '@/modules/common/components/molecules/PageTitle'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import ComponentDetailForm from '../organisms/ComponentDetailForm'
import { importComponentColumns } from '../organisms/importComponentColumns'

type Props = {
	id?: string
}

const ComponentDetailTemplate = ({ id }: Props) => {
	const pageTitle = id
		? 'Chỉnh sửa vật tư/ linh kiện'
		: 'Thêm vật tư/ linh kiện'
	const { data } = useQuery({
		...activityLogsControllerSearchOptions({
			query: { activityType: 'Tăng số lượng thiết bị' },
		}),
		select: (data) => {
			return data.data.filter((item) => {
				return item.componentId?._id === id
			})
		},
	})

	return (
		<div>
			<PageTitle title={pageTitle} />
			<ComponentDetailForm id={id} />
			<Card className="mt-5">
				<div className="text-2xl font-medium">Lịch sử nhập thêm linh kiện</div>
				<DataTable columns={importComponentColumns} data={data || []} />
			</Card>
		</div>
	)
}

export default ComponentDetailTemplate
