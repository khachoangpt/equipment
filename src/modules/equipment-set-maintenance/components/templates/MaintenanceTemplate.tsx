'use client'

import { equipmentRepairControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import useGetGeneralSettings from '@/hooks/general-settings/use-get-general-settings'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { columns } from '../organisms/MaintenanceColumns'

const MaintenanceTemplate = () => {
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()
	const { data: equipmentRepair } = useQuery({
		...equipmentRepairControllerSearchOptions({
			query: {
				limit: settings?.pagingSize,
				page,
			},
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
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">Bảo dưỡng / Sửa chữa</h3>
					</div>
					<Link href={pageList.createEquipmentSetMaintenance.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				<DataTable
					columns={columns}
					data={equipmentRepair?.data ?? []}
					onChangePage={setPage}
					pagination={{
						page,
						totalCount: equipmentRepair?.total ?? 0,
						pageSize: settings?.pagingSize ?? 10,
					}}
				/>
			</Card>
		</div>
	)
}

export default MaintenanceTemplate
