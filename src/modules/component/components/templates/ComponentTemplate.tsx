'use client'

import { componentsControllerFindAllOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import useGetGeneralSettings from '@/hooks/general-settings/use-get-general-settings'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { columns } from '../organisms/ComponentColumns'

const ComponentTemplate = () => {
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()
	const { data: components } = useQuery({
		...componentsControllerFindAllOptions({
			query: { limit: settings?.pagingSize, page },
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
						<h3 className="font-bold text-2xl">Vật tư/ linh kiện</h3>
						{/* <Button
							variant="link"
							className="p-0 h-fit"
							onClick={() => setOpen((open) => !open)}
						>
							Tìm kiếm
							<ChevronDown />
						</Button> */}
					</div>
					<Link href={pageList.createAssembledEquipmentComponent.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				<DataTable
					columns={columns}
					data={components?.data ?? []}
					onChangePage={setPage}
					pagination={{
						page,
						totalCount: components?.total ?? 0,
						pageSize: settings?.pagingSize ?? 10,
					}}
				/>
			</Card>
		</div>
	)
}

export default ComponentTemplate
