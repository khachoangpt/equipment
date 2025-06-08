import { Card } from '@/components/ui/card'
import DataTable from '@/modules/common/components/organisms/DataTable'
import { columns } from '../organisms/columns'

const AssembledEquipmentTemplate = () => {
	// const [open, setOpen] = useState<boolean>(false)

	return (
		<div className="h-full">
			<Card>
				<div className="flex items-center justify-between">
					<div className="flex items-end gap-x-2">
						<h3 className="font-bold text-2xl">Trang bị lắp ghép</h3>
						{/* <Button
							variant="link"
							className="p-0 h-fit"
							// onClick={() => setOpen((open) => !open)}
						>
							Tìm kiếm
							<ChevronDown />
						</Button> */}
					</div>
					{/* <Link href={pageList.createAssembledEquipment.href}>
						<Button>
							<Plus />
							Thêm
						</Button>
					</Link> */}
				</div>
				{/* <SearchEquipmentSet onOpenChange={setOpen} open={open} /> */}
				<DataTable columns={columns} data={[]} />
			</Card>
		</div>
	)
}

export default AssembledEquipmentTemplate
