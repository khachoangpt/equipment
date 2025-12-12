'use client'

import { equipmentRepairControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { pageList } from '@/configs/routes'
import useGetGeneralSettings from '@/hooks/general-settings/use-get-general-settings'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { parseAsString, useQueryStates } from 'nuqs'
import { useEffect, useState } from 'react'
import { columns } from '../organisms/MaintenanceColumns'
import SearchEquipmentRepair from '../organisms/SearchEquipmentRepair'

const MaintenanceTemplate = () => {
	const [open, setOpen] = useState<boolean>(true)
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()
	const [searchQuery] = useQueryStates({
		reportNumber: parseAsString.withDefault(''),
		equipmentQuery: parseAsString.withDefault(''),
		repairDateStart: parseAsString.withDefault(''),
		repairDateEnd: parseAsString.withDefault(''),
		fromUnitId: parseAsString.withDefault(''),
		repairLocation: parseAsString.withDefault(''),
	})

	useEffect(() => {
		setPage(1)
	}, [
		searchQuery.reportNumber,
		searchQuery.equipmentQuery,
		searchQuery.repairDateStart,
		searchQuery.repairDateEnd,
		searchQuery.fromUnitId,
		searchQuery.repairLocation,
	])
	const { data: equipmentRepair } = useQuery({
		...equipmentRepairControllerSearchOptions({
			query: {
				limit: settings?.pagingSize,
				page,
				reportNumber: searchQuery.reportNumber
					? searchQuery.reportNumber
					: undefined,
				equipmentQuery: searchQuery.equipmentQuery
					? searchQuery.equipmentQuery
					: undefined,
				repairDateStart: searchQuery.repairDateStart
					? searchQuery.repairDateStart
					: undefined,
				repairDateEnd: searchQuery.repairDateEnd
					? searchQuery.repairDateEnd
					: undefined,
				fromUnitId: searchQuery.fromUnitId ? searchQuery.fromUnitId : undefined,
				repairLocation: searchQuery.repairLocation
					? searchQuery.repairLocation
					: undefined,
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
		<div className="pb-10">
			<div className="text-center mb-10">
				<h3 className="font-bold text-3xl">Bảo dưỡng / Sửa chữa</h3>
			</div>
			<SearchEquipmentRepair onOpenChange={setOpen} open={open} />
			<div className="flex items-center justify-between mt-5">
				<div>
					<h5 className="font-bold text-lg">Danh sách bảo dưỡng / sửa chữa</h5>
				</div>
				<div className="flex items-center gap-x-2">
					<Link href={pageList.createEquipmentSetMaintenance.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
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
		</div>
	)
}

export default MaintenanceTemplate
