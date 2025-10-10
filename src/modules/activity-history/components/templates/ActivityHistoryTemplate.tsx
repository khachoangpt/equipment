'use client'
import { userHistoryControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import useGetGeneralSettings from '@/hooks/general-settings/use-get-general-settings'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { columns } from '../organisms/ActivityHistoryColumns'

const ActivityHistoryTemplate = () => {
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()

	const { data } = useQuery({
		...userHistoryControllerSearchOptions({
			query: { limit: Number(settings?.pagingSize), page },
		}),
		select: (data: any) => {
			return {
				...data,
				data: data?.data?.map((item: any, index: number) => ({
					...item,
					index: settings?.pagingSize
						? (page - 1) * settings?.pagingSize + index + 1
						: index + 1,
				})),
			}
		},
		enabled: !isFetchingGeneralSettings,
		placeholderData: (prev) => prev,
	})

	return (
		<div className="h-full">
			<div className="text-center mb-10">
				<h3 className="font-bold text-3xl">Lịch sử hoạt động</h3>
			</div>
			<DataTable
				columns={columns}
				data={data?.data ?? []}
				onChangePage={setPage}
				pagination={{
					page,
					totalCount: data?.total ?? 0,
					pageSize: settings?.pagingSize ?? 10,
				}}
			/>
		</div>
	)
}

export default ActivityHistoryTemplate
