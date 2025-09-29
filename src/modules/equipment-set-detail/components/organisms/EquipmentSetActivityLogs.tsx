'use client'

import type { ActivityLog } from '@/client'
import { activityLogsControllerFindByInstanceOptions } from '@/client/@tanstack/react-query.gen'
import { Card } from '@/components/ui/card'
import PageTitle from '@/modules/common/components/molecules/PageTitle'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'

type Props = {
	id?: string
}

const EquipmentSetActivityLogs = ({ id }: Props) => {
	const { data } = useQuery({
		...activityLogsControllerFindByInstanceOptions({
			path: { instanceId: id ?? '' },
		}),
	})
	const columns: ColumnDef<ActivityLog>[] = [
		{
			accessorKey: 'index',
			header: 'STT',
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: 'activityType',
			header: 'Hành động',
		},
		{
			accessorKey: 'createdBy',
			header: 'Người thực hiện',
		},
		{
			accessorKey: 'createdAt',
			header: 'Ngày thêm',
			cell: ({ row }) => {
				return new Date(row.original.createdAt).toLocaleDateString('vi-VN')
			},
		},
		{
			accessorKey: 'notes',
			header: 'Ghi chú',
		},
	]
	return (
		<div className="mt-5">
			<PageTitle title={'Lịch sử trang bị'} />
			<Card className="mt-2">
				<DataTable columns={columns} data={data ?? []} />
			</Card>
		</div>
	)
}
export default EquipmentSetActivityLogs
