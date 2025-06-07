'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import { equipmentHandovers } from '@/mocks/equipment.mock'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { columns } from '../organisms/HandOverColumns'

const HandOverTemplate = () => {
	const [paginationState, setPaginationState] = useState({
		pageIndex: 0,
		pageSize: 10,
	})

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">Bàn giao trang bị</h3>
					</div>
					<Link href={pageList.createEquipmentSetHandover.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				<DataTable
					columns={columns}
					data={equipmentHandovers}
					pageIndex={paginationState.pageIndex}
					pageSize={paginationState.pageSize}
					rowCount={equipmentHandovers.length}
					onPaginationChange={setPaginationState}
				/>
			</Card>
		</div>
	)
}

export default HandOverTemplate
