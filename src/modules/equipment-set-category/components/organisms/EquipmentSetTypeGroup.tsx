'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { TypeGroupDetailSchema } from '@/configs/schema'
import { equipmentSetTypeGroups } from '@/mocks/equipment.mock'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import DialogAddTypeGroup from './DialogAddTypeGroup'
import { columns } from './EquipmentSetTypeGroupTableColumns'

const EquipmentSetTypeGroup = () => {
	const [open, setOpen] = useState<boolean>(false)

	const handleConfirmAdd: SubmitHandler<TypeGroupDetailSchema> = () => {
		setOpen(false)
	}

	return (
		<Card>
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-2xl">Nhóm loại trang bị</h3>
				<Button onClick={() => setOpen(true)}>
					<Plus />
					Thêm
				</Button>
			</div>
			<DataTable columns={columns} data={equipmentSetTypeGroups} />
			<DialogAddTypeGroup
				open={open}
				onOpenChange={setOpen}
				onConfirm={handleConfirmAdd}
			/>
		</Card>
	)
}

export default EquipmentSetTypeGroup
