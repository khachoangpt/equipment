'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { pageList } from '@/configs/routes'
import { equipmentSets } from '@/mocks/equipment.mock'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { ChevronDown, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { columns } from '../organisms/EquipmentSetColumns'
import SearchEquipmentSet from '../organisms/SearchEquipmentSet'

const EquipmentSetTemplate = () => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">Trang bị đồng bộ</h3>
						<Button
							variant="link"
							className="p-0 h-fit"
							onClick={() => setOpen((open) => !open)}
						>
							Tìm kiếm
							<ChevronDown />
						</Button>
					</div>
					<Link href={pageList.equipmentSetCreate.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link>
				</div>
				<SearchEquipmentSet onOpenChange={setOpen} open={open} />
				<DataTable columns={columns} data={equipmentSets} />
			</Card>
		</div>
	)
}

export default EquipmentSetTemplate
