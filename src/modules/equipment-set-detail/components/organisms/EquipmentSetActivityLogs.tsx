'use client'

import type { ActivityLog } from '@/client'
import { activityLogsControllerFindByInstanceOptions } from '@/client/@tanstack/react-query.gen'
import { Card } from '@/components/ui/card'
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
			cell: ({ row }) => {
				return (
					row.original.createdBy?.fullName ?? row.original.createdBy?.username
				)
			},
		},
		{
			accessorKey: 'createdAt',
			header: 'Ngày',
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
			<Card>
				<DataTable columns={columns} data={data ?? []} />
			</Card>
		</div>
	)
}
export default EquipmentSetActivityLogs
