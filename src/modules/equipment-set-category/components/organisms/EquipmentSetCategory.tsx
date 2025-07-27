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
import useGetGeneralSettings from '@/hooks/general-settings/use-get-general-settings'
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
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()
	const { data: equipmentSetCategories } = useQuery({
		...syncEquipmentControllerFindAllOptions({
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
				onError: (error) => {
					toast.error((error.response?.data as any)?.message)
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
			<DataTable
				columns={columns}
				data={equipmentSetCategories?.data ?? []}
				onChangePage={setPage}
				pagination={{
					page,
					totalCount: equipmentSetCategories?.total ?? 0,
					pageSize: settings?.pagingSize ?? 10,
				}}
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
