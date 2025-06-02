'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import { equipmentSets } from '@/mocks/equipment.mock'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { columns } from '../organisms/EquipmentSetColumns'

const EquipmentSetTemplate = () => {
	const [paginationState, setPaginationState] = useState({
		pageIndex: 0,
		pageSize: 10,
	})

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-2xl">Trang bị đồng bộ</h3>
					<Link href={pageList.equipmentSetCreate.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				<DataTable
					columns={columns}
					data={equipmentSets}
					pageIndex={paginationState.pageIndex}
					pageSize={paginationState.pageSize}
					rowCount={equipmentSets.length}
					onPaginationChange={setPaginationState}
				/>
			</Card>
		</div>
	)
}

export default EquipmentSetTemplate
