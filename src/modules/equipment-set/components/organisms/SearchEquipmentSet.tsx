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
import {} from '@/mocks/equipment.mock'
import { useQuery } from '@tanstack/react-query'
import { parseAsString, useQueryStates } from 'nuqs'
import useSearchEquipmentSetController from '../../controllers/search-equipment-set.controller'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const SearchEquipmentSet = ({ onOpenChange, open }: Props) => {
	const { form, onSubmit, defaultValues } = useSearchEquipmentSetController()
	const { control } = form
	const [_, setSearchQuery] = useQueryStates({
		serialNumber: parseAsString.withDefault(''),
		name: parseAsString.withDefault(''),
		entryPlanNumber: parseAsString.withDefault(''),
		qualityLevelId: parseAsString.withDefault(''),
		status: parseAsString.withDefault(''),
		usingUnitId: parseAsString.withDefault(''),
		countryOfOrigin: parseAsString.withDefault(''),
		groupId: parseAsString.withDefault(''),
	})
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
						<div className="grid grid-cols-3 gap-x-10 gap-y-3">
							<FormField
								control={control}
								name="serialNumber"
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
								name="entryPlanNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Số kế hoạch nhập</FormLabel>
										<FormControl>
											<Input placeholder="Số kế hoạch nhập" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="qualityLevelId"
								render={({ field: { value, onChange } }) => (
									<FormItem key={value}>
										<FormLabel>Chất lượng</FormLabel>
										<FormControl>
											<Select value={value} onValueChange={onChange}>
												<SelectTrigger className="w-full">
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
									<FormItem>
										<FormLabel>Trạng thái</FormLabel>
										<FormControl>
											<Input placeholder="Trạng thái" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="usingUnitId"
								render={({ field: { value, onChange } }) => (
									<FormItem>
										<FormLabel>Đơn vị</FormLabel>
										<FormControl>
											<Select value={value} onValueChange={onChange}>
												<SelectTrigger className="w-full">
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
								control={control}
								name="countryOfOrigin"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nguồn cấp</FormLabel>
										<FormControl>
											<Input placeholder="Nguồn cấp" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="groupId"
								render={({ field: { value, onChange } }) => (
									<FormItem key={value}>
										<FormLabel>Nhóm loại</FormLabel>
										<FormControl>
											<Select value={value} onValueChange={onChange}>
												<SelectTrigger className="w-full">
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
						</div>
						<div className="flex justify-end gap-x-3">
							<Button
								type="button"
								variant={'secondary'}
								onClick={() => setSearchQuery(defaultValues)}
							>
								Làm mới
							</Button>
							<Button type="submit" onClick={form.handleSubmit(onSubmit)}>
								Tìm kiếm
							</Button>
						</div>
					</Form>
				</CollapsibleContent>
			</Collapsible>
		</div>
	)
}

export default SearchEquipmentSet
