'use client'

import { activityLogsControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { columns } from '../organisms/LiquidationColumns'

const LiquidationTemplate = () => {
	const { data } = useQuery({
		...activityLogsControllerSearchOptions({
			query: { activityType: 'Thanh lý' },
		}),
	})

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">Thanh lý</h3>
					</div>
					<Link href={pageList.createEquipmentSetLiquidation.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				<DataTable columns={columns} data={data ?? []} />
			</Card>
		</div>
	)
}

export default LiquidationTemplate
