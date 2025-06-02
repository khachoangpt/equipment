import { DatePicker } from '@/components/custom/date-picker/DatePicker'
import { Card } from '@/components/ui/card'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useSearchEquipmentSetController from '../../controllers/search-equipment-set.controller'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const SearchEquipmentSet = ({ onOpenChange, open }: Props) => {
	const { form } = useSearchEquipmentSetController()
	const { control } = form

	return (
		<div>
			<Collapsible open={open} onOpenChange={onOpenChange}>
				<CollapsibleContent>
					<Card>
						<Form {...form}>
							<div className="grid grid-cols-3 gap-x-10 gap-y-5">
								<FormField
									control={control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tên trang bị</FormLabel>
											<FormControl>
												<Input placeholder="Tên trang bị" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="serial"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Mã hiệu serial</FormLabel>
											<FormControl>
												<Input placeholder="Mã hiệu serial" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="importDate"
									render={({ field: { onChange, value } }) => (
										<FormItem>
											<FormLabel>Ngày nhập</FormLabel>
											<FormControl>
												<DatePicker
													onChange={onChange}
													value={new Date(value || 0)}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</Form>
					</Card>
				</CollapsibleContent>
			</Collapsible>
		</div>
	)
}

export default SearchEquipmentSet
