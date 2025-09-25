'use client'

import { equipmentHandoverControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
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
import DialogStatisticHandover from '../organisms/DialogStatisticHandover'
import { columns } from '../organisms/HandOverColumns'
import SearchEquipmentHandover from '../organisms/SearchEquipmentHandover'

const HandOverTemplate = () => {
	const [open, setOpen] = useState<boolean>(true)
	const [openStatisticHandover, setOpenStatisticHandover] =
		useState<boolean>(false)
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()
	const [searchQuery] = useQueryStates({
		reportNumber: parseAsString.withDefault(''),
		fromUnitId: parseAsString.withDefault(''),
		toUnitId: parseAsString.withDefault(''),
		handoverDateStart: parseAsString.withDefault(''),
		handoverDateEnd: parseAsString.withDefault(''),
		createdById: parseAsString.withDefault(''),
		receiverId: parseAsString.withDefault(''),
		equipmentQuery: parseAsString.withDefault(''),
	})
	const { data: equipmentHandovers } = useQuery({
		...equipmentHandoverControllerSearchOptions({
			query: {
				limit: settings?.pagingSize,
				page,
				createdById: searchQuery.createdById
					? searchQuery.createdById
					: undefined,
				equipmentQuery: searchQuery.equipmentQuery
					? searchQuery.equipmentQuery
					: undefined,
				fromUnitId: searchQuery.fromUnitId ? searchQuery.fromUnitId : undefined,
				handoverDateEnd: searchQuery.handoverDateEnd
					? searchQuery.handoverDateEnd
					: undefined,
				handoverDateStart: searchQuery.handoverDateStart
					? searchQuery.handoverDateStart
					: undefined,
				receiverId: searchQuery.receiverId ? searchQuery.receiverId : undefined,
				reportNumber: searchQuery.reportNumber
					? searchQuery.reportNumber
					: undefined,
				toUnitId: searchQuery.toUnitId ? searchQuery.toUnitId : undefined,
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
						<h3 className="font-bold text-2xl">Bàn giao trang bị</h3>
					</div>
					<div className="flex items-center gap-x-2">
						<Button onClick={() => setOpenStatisticHandover(true)}>
							Thống kê
						</Button>
						<Link href={pageList.createEquipmentSetHandover.href}>
							<Button>
								<Plus />
								Thêm
							</Button>
						</Link>
					</div>
				</div>
				<div className="mb-5">
					<SearchEquipmentHandover onOpenChange={setOpen} open={open} />
				</div>
				<DataTable
					columns={columns}
					data={equipmentHandovers?.data ?? []}
					onChangePage={setPage}
					pagination={{
						page,
						totalCount: equipmentHandovers?.total ?? 0,
						pageSize: settings?.pagingSize ?? 10,
					}}
				/>
			</Card>
			<DialogStatisticHandover
				open={openStatisticHandover}
				onOpenChange={setOpenStatisticHandover}
			/>
		</div>
	)
}

export default HandOverTemplate
