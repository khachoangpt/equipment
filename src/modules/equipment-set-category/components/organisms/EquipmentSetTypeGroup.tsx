'use client'

import {
	equipmentGroupsControllerCreateMutation,
	equipmentGroupsControllerFindAllOptions,
	equipmentGroupsControllerFindAllQueryKey,
} from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { queryClient } from '@/configs/query-client'
import type { TypeGroupDetailSchema } from '@/configs/schema'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import DialogAddTypeGroup from './DialogAddTypeGroup'
import { columns } from './EquipmentSetTypeGroupTableColumns'

const EquipmentSetTypeGroup = () => {
	const [open, setOpen] = useState<boolean>(false)
	const { data: equipmentSetTypeGroups } = useQuery({
		...equipmentGroupsControllerFindAllOptions({
			query: { type: 'EQUIPMENT_GROUP' },
		}),
	})
	const { mutate: create } = useMutation({
		...equipmentGroupsControllerCreateMutation(),
	})

	const handleConfirmAdd: SubmitHandler<TypeGroupDetailSchema> = (data) => {
		create(
			{
				body: {
					code: data.code,
					name: data.name,
					note: data.note,
				},
			},
			{
				onError: () => {
					toast.error('Tạo nhóm loại trang bị khônng thành công')
					setOpen(false)
				},
				onSuccess: () => {
					toast.success('Tạo nhóm loại trang bị thành công')
					queryClient.invalidateQueries({
						queryKey: equipmentGroupsControllerFindAllQueryKey(),
					})
					setOpen(false)
				},
			},
		)
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
			<DataTable
				columns={columns}
				data={(equipmentSetTypeGroups ?? []) as any}
			/>
			<DialogAddTypeGroup
				open={open}
				onOpenChange={setOpen}
				onConfirm={handleConfirmAdd}
			/>
		</Card>
	)
}

export default EquipmentSetTypeGroup
