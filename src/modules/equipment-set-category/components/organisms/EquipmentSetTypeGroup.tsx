'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { equipmentSetTypeGroups } from '@/mocks/equipment.mock'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import DialogAddTypeGroup from './DialogAddTypeGroup'
import { columns } from './EquipmentSetTypeGroupTableColumns'

const EquipmentSetTypeGroup = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [paginationState, setPaginationState] = useState({
		pageIndex: 0,
		pageSize: 10,
	})

	return (
		<Card>
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-2xl">Danh mục nhóm loại trang bị</h3>
				<Button onClick={() => setOpen(true)}>
					<Plus />
					Thêm
				</Button>
			</div>
			<DataTable
				columns={columns}
				data={equipmentSetTypeGroups}
				onPaginationChange={setPaginationState}
				pageIndex={paginationState.pageIndex}
				pageSize={paginationState.pageSize}
				rowCount={equipmentSetTypeGroups.length}
			/>
			<DialogAddTypeGroup
				open={open}
				onOpenChange={setOpen}
				onConfirm={() => setOpen(false)}
			/>
		</Card>
	)
}

export default EquipmentSetTypeGroup
