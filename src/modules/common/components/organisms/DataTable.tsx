'use client'
import { Pagination } from '@/components/custom/pagination'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
	type ColumnDef,
	type ExpandedState,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

type Props<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	pagination?: {
		page: number
		pageSize: number
		totalCount: number
	}
	onChangePage?: (page: number) => void
	getSubRows?: (row: TData) => TData[] | undefined
	enableExpanding?: boolean
}

function DataTable<TData, TValue>({
	columns,
	data,
	pagination,
	onChangePage,
	getSubRows,
	enableExpanding = false,
}: Props<TData, TValue>) {
	const [expanded, setExpanded] = useState<ExpandedState>({})

	// Tạo cột expand nếu enableExpanding hoặc getSubRows được cung cấp
	const expandColumn: ColumnDef<TData, TValue> = {
		id: 'expand',
		header: '',
		enableResizing: false,
		size: 50,
		cell: ({ row }) => {
			const hasSubRows = row.getCanExpand()
			return (
				<div className="flex items-center justify-center w-6 h-6">
					{hasSubRows ? (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation()
								row.toggleExpanded()
							}}
							className="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors"
							aria-label={row.getIsExpanded() ? 'Thu gọn' : 'Mở rộng'}
						>
							{row.getIsExpanded() ? (
								<ChevronDown className="w-4 h-4" />
							) : (
								<ChevronRight className="w-4 h-4" />
							)}
						</button>
					) : (
						<div className="w-6" />
					)}
				</div>
			)
		},
	}

	const allColumns =
		enableExpanding || getSubRows ? [expandColumn, ...columns] : columns

	const table = useReactTable({
		data,
		columns: allColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getExpandedRowModel:
			enableExpanding || getSubRows ? getExpandedRowModel() : undefined,
		getSubRows: getSubRows || ((row: any) => row.children),
		state: {
			expanded,
		},
		onExpandedChange: (updaterOrValue) => {
			if (typeof updaterOrValue === 'function') {
				setExpanded(updaterOrValue(expanded))
			} else {
				setExpanded(updaterOrValue)
			}
		},
	})

	return (
		<>
			<Table>
				<TableHeader className="sticky top-0 z-10 bg-white">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header, index) => (
								<TableHead
									key={header.id}
									className={cn({
										'rounded-tl-sm': index === 0,
										'rounded-tr-sm': index === headerGroup.headers.length - 1,
									})}
									style={{
										width: header.getSize(),
									}}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className="border-b bg-white">
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => {
							const depth = row.depth

							return (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className={cn({
										'bg-gray-50': depth > 0,
									})}
								>
									{row.getVisibleCells().map((cell, cellIndex) => {
										return (
											<TableCell
												key={cell.id}
												className={cn({
													'border-l': cellIndex === 0,
													'border-r':
														cellIndex === row.getVisibleCells().length - 1,
												})}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										)
									})}
								</TableRow>
							)
						})
					) : (
						<TableRow>
							<TableCell
								colSpan={allColumns.length}
								className="h-24 text-center"
							>
								Không có dữ liệu
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{pagination && (
				<Pagination
					onChange={(page) => onChangePage?.(page)}
					page={pagination?.page ?? 0}
					pageSize={pagination?.pageSize ?? 0}
					totalCount={pagination?.totalCount ?? 0}
				/>
			)}
		</>
	)
}

export default DataTable
