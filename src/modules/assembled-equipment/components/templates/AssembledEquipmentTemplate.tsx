'use client'

import { equipmentInstancesControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { pageList } from '@/configs/routes'
import useGetGeneralSettings from '@/hooks/general-settings/use-get-general-settings'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { parseAsString, useQueryStates } from 'nuqs'
import { useState } from 'react'
import DialogStatisticEquipment from '../organisms/DialogStatisticEquipment'
import { columns } from '../organisms/columns'

const AssembledEquipmentTemplate = () => {
	// const [open, setOpen] = useState<boolean>(true)
	const [openStatisticHandover, setOpenStatisticHandover] =
		useState<boolean>(false)
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()
	const [searchQuery] = useQueryStates({
		serialNumber: parseAsString.withDefault(''),
		name: parseAsString.withDefault(''),
		entryPlanNumber: parseAsString.withDefault(''),
		qualityLevelId: parseAsString.withDefault(''),
		status: parseAsString.withDefault(''),
		usingUnitId: parseAsString.withDefault(''),
		countryOfOrigin: parseAsString.withDefault(''),
		groupId: parseAsString.withDefault(''),
	})
	const { data: assembledEquipments } = useQuery({
		...equipmentInstancesControllerSearchOptions({
			query: {
				type: 'ASSEMBLED_EQUIPMENT',
				limit: settings?.pagingSize,
				page,
				serialNumber: searchQuery.serialNumber
					? searchQuery.serialNumber
					: undefined,
				name: searchQuery.name ? searchQuery.name : undefined,
				entryPlanNumber: searchQuery.entryPlanNumber
					? searchQuery.entryPlanNumber
					: undefined,
				qualityLevelId: searchQuery.qualityLevelId
					? searchQuery.qualityLevelId
					: undefined,
				status: searchQuery.status ? searchQuery.status : undefined,
				usingUnitId: searchQuery.usingUnitId
					? searchQuery.usingUnitId
					: undefined,
				countryOfOrigin: searchQuery.countryOfOrigin
					? searchQuery.countryOfOrigin
					: undefined,
				groupId: searchQuery.groupId ? searchQuery.groupId : undefined,
			},
		}),
		select: (data) => {
			return {
				...data,
				data: data?.data?.map((item, index) => ({
					...item,
					index: settings?.pagingSize
						? (page - 1) * settings?.pagingSize + index + 1
						: index + 1,
				})),
			}
		},
		enabled: !isFetchingGeneralSettings,
	})

	return (
		<div className="pb-10">
			<div className="text-center mb-10">
				<h3 className="font-bold text-3xl">Trang bị lắp ghép</h3>
			</div>
			<div className="flex justify-between items-center mt-5">
				<div>
					<h5 className="font-bold text-lg">Danh sách trang bị lắp ghép</h5>
				</div>
				<div className="flex items-center gap-x-2">
					<Button onClick={() => setOpenStatisticHandover(true)}>
						Thống kê
					</Button>
					<Link href={pageList.createAssembledEquipment.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
			</div>
			<div className="">
				{/* <SearchEquipmentSet onOpenChange={setOpen} open={open} /> */}
			</div>
			<DataTable
				onChangePage={setPage}
				pagination={{
					page,
					pageSize: settings?.pagingSize ?? 10,
					totalCount: assembledEquipments?.total ?? 0,
				}}
				columns={columns}
				data={assembledEquipments?.data || []}
			/>
			<DialogStatisticEquipment
				open={openStatisticHandover}
				onOpenChange={setOpenStatisticHandover}
			/>
		</div>
	)
}

export default AssembledEquipmentTemplate
