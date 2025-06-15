'use client'

import {
	syncEquipmentControllerCreateMutation,
	syncEquipmentControllerFindAllOptions,
	syncEquipmentControllerFindAllQueryKey,
} from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { queryClient } from '@/configs/query-client'
import type { CategoryEquipmentSetDetailSchema } from '@/configs/schema'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import DialogAddCategoryEquipmentSet from './DialogAddCategoryEquipmentSet'
import { columns } from './EquipmentSetCategoryTableColumns'

const EquipmentSetCategory = () => {
	const [open, setOpen] = useState<boolean>(false)
	const { data: equipmentSetCategories } = useQuery({
		...syncEquipmentControllerFindAllOptions(),
	})
	const { mutate: create } = useMutation({
		...syncEquipmentControllerCreateMutation(),
	})

	const handleConfirmAdd: SubmitHandler<CategoryEquipmentSetDetailSchema> = (
		data,
	) => {
		create(
			{
				body: {
					groupId: data.type,
					name: data.name,
					field: data.field,
					initialPrice: data.defaultAmount,
					notes: data.note,
				},
			},
			{
				onError: () => {
					toast.error('Tạo không thành công')
					setOpen(false)
				},
				onSuccess: () => {
					toast.success('Tạo thành công')
					queryClient.invalidateQueries({
						queryKey: syncEquipmentControllerFindAllQueryKey(),
					})
					setOpen(false)
				},
			},
		)
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
			<DataTable columns={columns} data={equipmentSetCategories ?? []} />
			<DialogAddCategoryEquipmentSet
				open={open}
				onOpenChange={setOpen}
				onConfirm={handleConfirmAdd}
			/>
		</Card>
	)
}

export default EquipmentSetCategory
