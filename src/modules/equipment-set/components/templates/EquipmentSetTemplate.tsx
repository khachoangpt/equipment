'use client'

import { equipmentInstancesControllerSearchOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { columns } from '../organisms/EquipmentSetColumns'
import SearchEquipmentSet from '../organisms/SearchEquipmentSet'

const EquipmentSetTemplate = () => {
	const [open, setOpen] = useState<boolean>(false)
	const { data: equipmentSets } = useQuery({
		...equipmentInstancesControllerSearchOptions(),
	})

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">Trang bị</h3>
					</div>
					<Link href={pageList.equipmentSetCreate.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				<SearchEquipmentSet onOpenChange={setOpen} open={open} />
				<DataTable columns={columns} data={(equipmentSets ?? []) as any} />
			</Card>
		</div>
	)
}

export default EquipmentSetTemplate
