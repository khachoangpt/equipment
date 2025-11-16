'use client'

import { equipmentInstancesControllerGetInstancesWithGroupedDetailsOptions } from '@/client/@tanstack/react-query.gen'
import useGetGeneralSettings from '@/hooks/general-settings/use-get-general-settings'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { parseAsString, useQueryStates } from 'nuqs'
import { useMemo, useState } from 'react'
import { columns as baseColumns } from '../organisms/EquipmentSetInventoryColumns'
import SearchEquipmentSetInventory from '../organisms/SearchEquipmentSetInventory'

const EquipmentSetInventoryTemplate = () => {
	const [open, setOpen] = useState<boolean>(true)
	const [page, setPage] = useState(1)
	const { settings, isFetchingGeneralSettings } = useGetGeneralSettings()
	const [searchQuery] = useQueryStates({
		serialNumber: parseAsString.withDefault(''),
		name: parseAsString.withDefault(''),
		entryPlanNumber: parseAsString.withDefault(''),
		qualityLevelId: parseAsString.withDefault(''),
		status: parseAsString.withDefault(''),
		usingUnitId: parseAsString.withDefault(''),
		countryOfOrigin: parseAsString.withDefault(''),
		groupId: parseAsString.withDefault(''),
		featureConfiguration: parseAsString.withDefault(''),
		technicalSpecifications: parseAsString.withDefault(''),
	})
	const { data: equipmentSets } = useQuery({
		...equipmentInstancesControllerGetInstancesWithGroupedDetailsOptions({
			query: {
				type: 'SYNCHRONIZED_EQUIPMENT',
				limit: settings?.pagingSize,
				page,
				serialNumber: searchQuery.serialNumber
					? searchQuery.serialNumber
					: undefined,
				name: searchQuery.name ? searchQuery.name : undefined,
				entryPlanNumber: searchQuery.entryPlanNumber
					? searchQuery.entryPlanNumber
					: undefined,
				qualityLevelId: searchQuery.qualityLevelId
					? (searchQuery.qualityLevelId as any)
					: undefined,
				status: searchQuery.status ? searchQuery.status : undefined,
				usingUnitId: searchQuery.usingUnitId
					? (searchQuery.usingUnitId as any)
					: undefined,
				countryOfOrigin: searchQuery.countryOfOrigin
					? searchQuery.countryOfOrigin
					: undefined,
				groupId: searchQuery.groupId ? (searchQuery.groupId as any) : undefined,
				featureConfiguration: searchQuery.featureConfiguration
					? (searchQuery.featureConfiguration as any)
					: undefined,
				technicalSpecifications: searchQuery.technicalSpecifications
					? (searchQuery.technicalSpecifications as any)
					: undefined,
			},
		}),
		select: (data: any) => {
			return {
				...data,
				data: data?.data?.map((item: any, index: number) => {
					const children: any[] = []
					if (item.detailsByStatusAndQuality) {
						for (const [status, usingUnits] of Object.entries(
							item.detailsByStatusAndQuality,
						)) {
							for (const [usingUnitName, qualityLevels] of Object.entries(
								usingUnits as any,
							)) {
								for (const [qualityLevelId, quantity] of Object.entries(
									qualityLevels as any,
								)) {
									children.push({
										...item,
										_id: `${item?.instance?._id}`,
										status,
										usingUnitName:
											usingUnitName === 'null' ? null : usingUnitName,
										qualityLevelId,
										quantity,
										index: undefined,
									})
								}
							}
						}
					}

					return {
						...item,
						index: settings?.pagingSize
							? (page - 1) * settings?.pagingSize + index + 1
							: index + 1,
						children: children.length > 0 ? children : undefined,
					}
				}),
			}
		},
		enabled: !isFetchingGeneralSettings,
		placeholderData: (prev: any) => prev,
	})

	const columns = useMemo(() => {
		return baseColumns.map((col) => {
			const accessorKey = 'accessorKey' in col ? col.accessorKey : undefined

			if (col.id === 'actions') {
				return {
					...col,
					cell: (ctx: any) => {
						const row = ctx.row
						if (row.depth !== 1) {
							return null
						}
						if (typeof col.cell === 'function') {
							return col.cell(ctx)
						}
						return null
					},
				}
			}
			if (accessorKey === 'usingUnitId') {
				return {
					...col,
					cell: (ctx: any) => {
						const row = ctx.row
						const depth = row.depth
						const original = row.original

						if (depth === 1) {
							return (
								<span className="text-right">
									{original.usingUnitName ||
										original?.instance?.usingUnitId?.name ||
										'Không có đơn vị'}
								</span>
							)
						}

						if (typeof col.cell === 'function') {
							return col.cell(ctx)
						}
						return null
					},
				}
			}
			if (accessorKey === 'status') {
				return {
					...col,
					cell: (ctx: any) => {
						const row = ctx.row
						const depth = row.depth
						const original = row.original

						if (depth === 1 && original.status !== undefined) {
							return <span>{original.status}</span>
						}

						if (typeof col.cell === 'function') {
							return col.cell(ctx)
						}
						return null
					},
				}
			}
			if (accessorKey === 'qualityLevelId') {
				return {
					...col,
					cell: (ctx: any) => {
						const row = ctx.row
						const depth = row.depth

						if (depth !== 1) {
							return null
						}

						if (typeof col.cell === 'function') {
							return col.cell(ctx)
						}
						return null
					},
				}
			}
			if (accessorKey === 'quantity') {
				return {
					...col,
					cell: (ctx: any) => {
						const row = ctx.row
						const depth = row.depth
						const original = row.original

						if (depth !== 1) {
							return null
						}

						return <span>{original.quantity}</span>
					},
				}
			}
			if (
				accessorKey === 'index' ||
				accessorKey === 'instanceId' ||
				accessorKey === 'instance.serialNumber'
			) {
				return {
					...col,
					cell: (ctx: any) => {
						const row = ctx.row
						const depth = row.depth
						if (depth === 0 || depth === 1) {
							if (typeof col.cell === 'function') {
								return col.cell(ctx)
							}
							if (accessorKey) {
								return row.original[accessorKey]
							}
						}
						return null
					},
				}
			}
			return col
		})
	}, [baseColumns])

	return (
		<div className="pb-10">
			<div className="text-center mb-10">
				<h3 className="font-bold text-3xl">Kiểm kê trang bị</h3>
			</div>
			<SearchEquipmentSetInventory onOpenChange={setOpen} open={open} />
			<div className="flex justify-between items-center mt-5">
				<div>
					<h5 className="font-bold text-lg">Danh sách trang bị kiểm kê</h5>
				</div>
			</div>
			<DataTable
				enableExpanding
				columns={columns}
				data={(equipmentSets?.data ?? []) as any}
				onChangePage={setPage}
				pagination={{
					page,
					totalCount: equipmentSets?.total ?? 0,
					pageSize: settings?.pagingSize ?? 10,
				}}
			/>
		</div>
	)
}

export default EquipmentSetInventoryTemplate
