'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { columns } from '../organisms/MaintenanceColumns'

const MaintenanceTemplate = () => {
	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">Bảo dưỡng / Sửa chữa</h3>
					</div>
					<Link href={pageList.createEquipmentSetMaintenance.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				<DataTable columns={columns} data={[]} />
			</Card>
		</div>
	)
}

export default MaintenanceTemplate
