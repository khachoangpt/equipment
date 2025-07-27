'use client'

import {
	qualityLevelsControllerCreateMutation,
	qualityLevelsControllerFindAllOptions,
	qualityLevelsControllerFindAllQueryKey,
} from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { queryClient } from '@/configs/query-client'
import type { QualityDetailSchema } from '@/configs/schema'
import useGetGeneralSettings from '@/hooks/general-settings/use-get-general-settings'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import DialogAddQuality from './DialogAddQuality'
import { columns } from './EquipmentSetQualityTableColumns'

const EquipmentSetQuality = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()
	const { data: equipmentSetQuality } = useQuery({
		...qualityLevelsControllerFindAllOptions({
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
		...qualityLevelsControllerCreateMutation(),
	})

	const handleConfirmAdd: SubmitHandler<QualityDetailSchema> = (data) => {
		create(
			{
				body: {
					code: data.code,
					name: data.name,
					note: data.note,
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
						queryKey: qualityLevelsControllerFindAllQueryKey(),
					})
					setOpen(false)
				},
			},
		)
	}

	return (
		<Card>
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-2xl">Phân cấp chất lượng trang bị</h3>
				<Button onClick={() => setOpen(true)}>
					<Plus />
					Thêm
				</Button>
			</div>
			<DataTable
				onChangePage={setPage}
				pagination={{
					page,
					totalCount: equipmentSetQuality?.total ?? 0,
					pageSize: settings?.pagingSize ?? 10,
				}}
				columns={columns}
				data={(equipmentSetQuality?.data ?? []) as any}
			/>
			<DialogAddQuality
				open={open}
				onOpenChange={setOpen}
				onConfirm={handleConfirmAdd}
			/>
		</Card>
	)
}

export default EquipmentSetQuality
