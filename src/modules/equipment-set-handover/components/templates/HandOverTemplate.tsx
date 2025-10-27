'use client'

import { equipmentHandoverControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
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
		receiver: parseAsString.withDefault(''),
		sender: parseAsString.withDefault(''),
		equipmentQuery: parseAsString.withDefault(''),
	})
	const { data: equipmentHandovers } = useQuery({
		...equipmentHandoverControllerSearchOptions({
			query: {
				limit: settings?.pagingSize,
				page,
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
				receiver: searchQuery.receiver ? searchQuery.receiver : undefined,
				sender: searchQuery.sender ? searchQuery.sender : undefined,
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
		<div className="pb-10">
			<div className="text-center mb-10">
				<h3 className="font-bold text-3xl">Bàn giao trang bị</h3>
			</div>
			<div className="mb-5">
				<SearchEquipmentHandover onOpenChange={setOpen} open={open} />
			</div>
			<div className="flex justify-between items-center mt-5">
				<div>
					<h5 className="font-bold text-lg">Danh sách bàn giao trang bị</h5>
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
			<DialogStatisticHandover
				open={openStatisticHandover}
				onOpenChange={setOpenStatisticHandover}
			/>
		</div>
	)
}

export default HandOverTemplate
