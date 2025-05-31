'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { equipmentSetQuality } from '@/mocks/equipment.mock'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import DialogAddQuality from './DialogAddQuality'
import { columns } from './EquipmentSetQualityTableColumns'

const EquipmentSetQuality = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [paginationState, setPaginationState] = useState({
		pageIndex: 0,
		pageSize: 10,
	})

	return (
		<Card>
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-2xl">
					Danh mục phân cấp chất lượng trang bị
				</h3>
				<Button onClick={() => setOpen(true)}>
					<Plus />
					Thêm
				</Button>
			</div>
			<DataTable
				columns={columns}
				data={equipmentSetQuality}
				onPaginationChange={setPaginationState}
				pageIndex={paginationState.pageIndex}
				pageSize={paginationState.pageSize}
				rowCount={equipmentSetQuality.length}
			/>
			<DialogAddQuality
				open={open}
				onOpenChange={setOpen}
				onConfirm={() => setOpen(false)}
			/>
		</Card>
	)
}

export default EquipmentSetQuality
