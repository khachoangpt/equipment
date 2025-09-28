'use client'

import { equipmentInstancesControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import useGetGeneralSettings from '@/hooks/general-settings/use-get-general-settings'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { parseAsString, useQueryStates } from 'nuqs'
import { useState } from 'react'
import { columns } from '../organisms/EquipmentSetColumns'
import SearchEquipmentSet from '../organisms/SearchEquipmentSet'

const EquipmentSetTemplate = () => {
	const [open, setOpen] = useState<boolean>(true)
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
		featureConfiguration: parseAsString.withDefault(''),
		technicalSpecifications: parseAsString.withDefault(''),
	})
	const { data: equipmentSets } = useQuery({
		...equipmentInstancesControllerSearchOptions({
			query: {
				type: 'SYNCHRONIZED_EQUIPMENT',
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
				featureConfiguration: searchQuery.featureConfiguration
					? (searchQuery.featureConfiguration as any)
					: undefined,
				technicalSpecifications: searchQuery.technicalSpecifications
					? (searchQuery.technicalSpecifications as any)
					: undefined,
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
		placeholderData: (prev) => prev,
	})

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">Trang bị</h3>
					</div>
					<Link href={pageList.equipmentSetCreate.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				<div className="mb-5">
					<SearchEquipmentSet onOpenChange={setOpen} open={open} />
				</div>
				<DataTable
					columns={columns}
					data={(equipmentSets?.data ?? []) as any}
					onChangePage={setPage}
					pagination={{
						page,
						totalCount: equipmentSets?.total ?? 0,
						pageSize: settings?.pagingSize ?? 10,
					}}
				/>
			</Card>
		</div>
	)
}

export default EquipmentSetTemplate
