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
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'

type Props<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	pagination?: {
		page: number
		pageSize: number
		totalCount: number
	}
}

function DataTable<TData, TValue>({
	columns,
	data,
	pagination,
}: Props<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
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
				<TableBody className="border-b">
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell, cellIndex) => (
									<TableCell
										key={cell.id}
										className={cn({
											'border-l': cellIndex === 0,
											'border-r':
												cellIndex === row.getVisibleCells().length - 1,
										})}
									>
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
				onChange={() => {}}
				page={pagination?.page ?? 1}
				pageSize={pagination?.pageSize ?? 10}
				totalCount={pagination?.totalCount ?? 0}
			/>
		</>
	)
}

export default DataTable
