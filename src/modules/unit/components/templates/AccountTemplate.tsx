'use client'

import { unitsControllerFindAllOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { pageList } from '@/configs/routes'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { columns } from '../organisms/UnitTableColumns'

const UnitTemplate = () => {
	const router = useRouter()
	const { data: units, isLoading } = useQuery(unitsControllerFindAllOptions())

	if (isLoading) {
		return (
			<Card>
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-bold text-2xl">Đơn vị</h3>
					<Skeleton className="h-10 w-36" />
				</div>
				<div className="space-y-2">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
			</Card>
		)
	}

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-2xl">Đơn vị</h3>
					<Button onClick={() => router.push(pageList.unitCreate.href)}>
						<Plus />
						Thêm
					</Button>
				</div>
				<DataTable columns={columns} data={(units ?? []) as any} />
			</Card>
		</div>
	)
}

export default UnitTemplate
