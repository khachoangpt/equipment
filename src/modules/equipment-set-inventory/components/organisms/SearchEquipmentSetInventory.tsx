import {
	equipmentGroupsControllerFindAllOptions,
	qualityLevelsControllerFindAllOptions,
	unitsControllerFindAllOptions,
} from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import useSearchEquipmentSetInventoryController from '../../controllers/search-equipment-set-inventory.controller'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const SearchEquipmentSetInventory = ({ onOpenChange, open }: Props) => {
	const { form, onSubmit } = useSearchEquipmentSetInventoryController()
	const { control } = form
	const { data: quantityList } = useQuery({
		...qualityLevelsControllerFindAllOptions(),
		select(data) {
			return data?.data
		},
	})
	const { data: typeGroups } = useQuery({
		...equipmentGroupsControllerFindAllOptions(),
	})
	const { data: units } = useQuery({
		...unitsControllerFindAllOptions(),
		select(data) {
			return data?.data
		},
	})

	return (
		<div>
			<Collapsible open={open} onOpenChange={onOpenChange}>
				<CollapsibleContent>
					<Form {...form}>
						<div className="grid grid-cols-2 gap-x-10 gap-y-2">
							<FormField
								control={control}
								name="usingUnitId"
								render={({ field: { value, onChange } }) => (
									<FormItem className="flex">
										<FormLabel className="w-full">Đơn vị</FormLabel>
										<FormControl>
											<Select value={value} onValueChange={onChange}>
												<SelectTrigger
													className="w-full"
													clearable
													onClear={() => onChange('')}
												>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{units?.map((unit: any) => (
														<SelectItem key={unit._id} value={unit._id}>
															{unit.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="groupId"
								render={({ field: { value, onChange } }) => (
									<FormItem key={value} className="flex">
										<FormLabel className="w-full">Nhóm loại</FormLabel>
										<FormControl>
											<Select value={value} onValueChange={onChange}>
												<SelectTrigger
													className="w-full"
													clearable
													onClear={() => onChange('')}
												>
													<SelectValue placeholder="Nhóm loại" />
												</SelectTrigger>
												<SelectContent>
													{typeGroups?.data?.map((typeGroup) => (
														<SelectItem
															key={typeGroup._id}
															value={typeGroup._id}
														>
															{typeGroup.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="name"
								render={({ field }) => (
									<FormItem className="flex">
										<FormLabel className="w-full">Tên trang bị</FormLabel>
										<FormControl>
											<Input placeholder="Tên trang bị" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="serialNumber"
								render={({ field }) => (
									<FormItem className="flex">
										<FormLabel className="w-full">Mã hiệu</FormLabel>
										<FormControl>
											<Input placeholder="Mã hiệu serial" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="qualityLevelId"
								render={({ field: { value, onChange } }) => (
									<FormItem key={value} className="flex">
										<FormLabel className="w-full">Chất lượng</FormLabel>
										<FormControl>
											<Select value={value} onValueChange={onChange}>
												<SelectTrigger
													className="w-full"
													clearable
													onClear={() => onChange('')}
												>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{quantityList?.map((quantity: any) => (
														<SelectItem key={quantity._id} value={quantity._id}>
															{quantity.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="status"
								render={({ field }) => (
									<FormItem className="flex">
										<FormLabel className="w-full">Trạng thái</FormLabel>
										<FormControl>
											<Input placeholder="Trạng thái" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="countryOfOrigin"
								render={({ field }) => (
									<FormItem className="flex">
										<FormLabel className="w-full">Nguồn cấp</FormLabel>
										<FormControl>
											<Input placeholder="Nguồn cấp" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<div className="flex justify-center mt-3">
							<Button type="submit" onClick={form.handleSubmit(onSubmit)}>
								Lọc
							</Button>
						</div>
					</Form>
				</CollapsibleContent>
			</Collapsible>
		</div>
	)
}

export default SearchEquipmentSetInventory
