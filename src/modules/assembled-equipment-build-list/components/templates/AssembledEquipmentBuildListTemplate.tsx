'use client'

import { assembledEquipmentControllerFindAllBuildActivitiesOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { columns } from '../organisms/BuildColumns'

const AssembledEquipmentBuildListTemplate = () => {
	const { data: builds } = useQuery({
		...assembledEquipmentControllerFindAllBuildActivitiesOptions(),
	})

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">
							Danh sách xây dựng trang bị lắp ghép
						</h3>
						{/* <Button
							variant="link"
							className="p-0 h-fit"
							onClick={() => setOpen((open) => !open)}
						>
							Tìm kiếm
							<ChevronDown />
						</Button> */}
					</div>
					<Link href={pageList.assembledEquipmentBuildCreate.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				<DataTable columns={columns} data={builds ?? ([] as any)} />
			</Card>
		</div>
	)
}

export default AssembledEquipmentBuildListTemplate
