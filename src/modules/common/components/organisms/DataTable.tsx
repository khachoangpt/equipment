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
import {
	type ColumnDef,
	type OnChangeFn,
	type PaginationState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'

type Props<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	rowCount: number
	pageIndex: number
	pageSize: number
	onPaginationChange: OnChangeFn<PaginationState> | undefined
}

function DataTable<TData, TValue>({
	columns,
	data,
	pageIndex,
	pageSize,
	rowCount,
	onPaginationChange,
}: Props<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		rowCount,
		onPaginationChange,
		state: {
			pagination: { pageIndex, pageSize },
		},
	})

	return (
		<>
			<Table>
				<TableHeader className="sticky top-0 z-10 bg-white">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
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
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								Không có dữ liệu
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<Pagination
				onChange={(page) => table.setPageIndex(page - 1)}
				page={pageIndex + 1}
				pageSize={pageSize}
				totalCount={rowCount}
			/>
		</>
	)
}

export default DataTable
