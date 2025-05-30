'use client'

import { cn } from '@/utils'

import {
	Pagination as PaginationBase,
	PaginationContent,
	PaginationEllipsis,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { getPaginationItems } from './get-pagination-item'

type Props = {
	page: number
	pageSize: number
	totalCount: number
	length?: number
	name?: string
	onChange: (page: number) => void
}

export const Pagination = ({
	page = 1,
	pageSize = 1,
	totalCount = 1,
	length = 7,
	name = '',
	onChange,
}: Props) => {
	const numPages = Math.ceil(totalCount / pageSize)
	const pagination = getPaginationItems(page, numPages, length)

	const handlePrevious = () => {
		if (page === 1) return
		onChange(page - 1)
	}

	const handleNext = () => {
		if (page === numPages) return
		onChange(page + 1)
	}

	const handleChangePage = (page: number) => {
		onChange(page)
	}

	return (
		<PaginationBase>
			<PaginationContent>
				{numPages > 1 && (
					<PaginationPrevious
						data-disabled={page === 1}
						className="flex h-8 w-8 items-center justify-center rounded-full data-[disabled=false]hover:bg-[#BFDCFF] data-[disabled=true]:text-[#A3ACBA] data-[disabled=false]:hover:text-primary"
						onClick={() => {
							if (page === 1) return
							handlePrevious()
						}}
					/>
				)}
				{pagination.map((pageItem) => {
					if (Number.isNaN(pageItem)) {
						return <PaginationEllipsis key={`${name}_ellipsis`} />
					}
					return (
						<PaginationLink
							key={`${name}_${pageItem}_${pageItem}`}
							isActive={pageItem === page}
							onClick={() => handleChangePage(pageItem)}
							className={cn(
								'flex h-8 w-8 items-center justify-center rounded-full text-sm hover:bg-[#BFDCFF] hover:text-primary',
								{ 'bg-[#BFDCFF] text-primary': pageItem === page },
							)}
						>
							{pageItem}
						</PaginationLink>
					)
				})}
				{numPages > 1 && (
					<PaginationNext
						data-disabled={page === numPages}
						className="flex h-8 w-8 items-center justify-center rounded-full data-[disabled=false]hover:bg-[#BFDCFF] data-[disabled=true]:text-[#A3ACBA] data-[disabled=false]:hover:text-primary"
						onClick={handleNext}
					/>
				)}
			</PaginationContent>
		</PaginationBase>
	)
}
