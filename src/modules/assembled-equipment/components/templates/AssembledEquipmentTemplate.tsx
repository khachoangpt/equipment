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
import { useState } from 'react'
import { columns } from '../organisms/columns'

const AssembledEquipmentTemplate = () => {
	// const [open, setOpen] = useState<boolean>(false)
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()
	const { data: assembledEquipments } = useQuery({
		...equipmentInstancesControllerSearchOptions({
			query: {
				type: 'ASSEMBLED_EQUIPMENT',
				limit: settings?.pagingSize,
				page,
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
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">Trang bị lắp ghép</h3>
						{/* <Button
							variant="link"
							className="p-0 h-fit"
							// onClick={() => setOpen((open) => !open)}
						>
							Tìm kiếm
							<ChevronDown />
						</Button> */}
					</div>
					<Link href={pageList.createAssembledEquipment.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				{/* <SearchEquipmentSet onOpenChange={setOpen} open={open} /> */}
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
			</Card>
		</div>
	)
}

export default AssembledEquipmentTemplate
