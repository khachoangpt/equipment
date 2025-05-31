'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { equipmentSetCategories } from '@/mocks/equipment.mock'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import DialogAddCategoryEquipmentSet from './DialogAddCategoryEquipmentSet'
import { columns } from './EquipmentSetCategoryTableColumns'

const EquipmentSetCategory = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [paginationState, setPaginationState] = useState({
		pageIndex: 0,
		pageSize: 5,
	})

	const handleConfirmAdd = () => {
		setOpen(false)
	}

	return (
		<Card className="col-span-2">
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-2xl">Danh mục trang bị</h3>
				<Button onClick={() => setOpen(true)}>
					<Plus />
					Thêm
				</Button>
			</div>
			<DataTable
				columns={columns}
				data={equipmentSetCategories}
				onPaginationChange={setPaginationState}
				pageIndex={paginationState.pageIndex}
				pageSize={paginationState.pageSize}
				rowCount={equipmentSetCategories.length}
			/>
			<DialogAddCategoryEquipmentSet
				open={open}
				onOpenChange={setOpen}
				onConfirm={handleConfirmAdd}
			/>
		</Card>
	)
}

export default EquipmentSetCategory
