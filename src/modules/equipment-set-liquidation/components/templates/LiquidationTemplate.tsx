'use client'

import {
	equipmentDisposeControllerGenerateLiquidationFormLayoutMutation,
	equipmentDisposeControllerSearchOptions,
} from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import useGetGeneralSettings from '@/hooks/general-settings/use-get-general-settings'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { parseAsString, useQueryStates } from 'nuqs'
import { useState } from 'react'
import { columns } from '../organisms/LiquidationColumns'
import SearchEquipmentDispose from '../organisms/SearchEquipmentDispose'

const LiquidationTemplate = () => {
	const [open, setOpen] = useState<boolean>(true)
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()
	const [searchQuery] = useQueryStates({
		createdById: parseAsString.withDefault(''),
		decisionNumber: parseAsString.withDefault(''),
		disposalDateEnd: parseAsString.withDefault(''),
		disposalDateStart: parseAsString.withDefault(''),
		equipmentQuery: parseAsString.withDefault(''),
		search: parseAsString.withDefault(''),
		signer: parseAsString.withDefault(''),
		unitId: parseAsString.withDefault(''),
	})
	const { data } = useQuery({
		...equipmentDisposeControllerSearchOptions({
			query: {
				limit: settings?.pagingSize,
				page,
				createdById: searchQuery.createdById
					? searchQuery.createdById
					: undefined,
				decisionNumber: searchQuery.decisionNumber
					? searchQuery.decisionNumber
					: undefined,
				disposalDateEnd: searchQuery.disposalDateEnd
					? searchQuery.disposalDateEnd
					: undefined,
				disposalDateStart: searchQuery.disposalDateStart
					? searchQuery.disposalDateStart
					: undefined,
				equipmentQuery: searchQuery.equipmentQuery
					? searchQuery.equipmentQuery
					: undefined,
				search: searchQuery.search ? searchQuery.search : undefined,
				signer: searchQuery.signer ? searchQuery.signer : undefined,
				unitId: searchQuery.unitId ? searchQuery.unitId : undefined,
			},
		}),
		select: (data: any) => {
			return {
				...data,
				data: data?.data?.map((item: any, index: number) => ({
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

	const { mutateAsync, isPending } = useMutation({
		...equipmentDisposeControllerGenerateLiquidationFormLayoutMutation(),
	})

	const handleDownload = (pdfContent: string, fileName = 'document.pdf') => {
		const blob = new Blob([pdfContent], { type: 'application/pdf' })
		const url = URL.createObjectURL(blob)

		const link = document.createElement('a')
		link.href = url
		link.download = fileName
		link.click()

		URL.revokeObjectURL(url)
	}

	const handleGenerateReport = async () => {
		const res = await mutateAsync({
			responseType: 'arraybuffer',
		})

		handleDownload(res as string, 'Bien_ban_thanh_ly.pdf')
	}

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">Thanh lý</h3>
					</div>
					<div className="flex items-center gap-x-3">
						<Button
							variant={'outline'}
							disabled={isPending}
							onClick={handleGenerateReport}
							className="text-green-600 cursor-pointer"
						>
							Xuất PDF
						</Button>
						<Link href={pageList.createEquipmentSetLiquidation.href}>
							<Button>
								<Plus />
								Thêm
							</Button>
						</Link>
					</div>
				</div>
				<div className="mb-5">
					<SearchEquipmentDispose onOpenChange={setOpen} open={open} />
				</div>
				<DataTable
					columns={columns}
					data={data?.data ?? []}
					onChangePage={setPage}
					pagination={{
						page,
						totalCount: data?.total ?? 0,
						pageSize: settings?.pagingSize ?? 10,
					}}
				/>
			</Card>
		</div>
	)
}

export default LiquidationTemplate
