import { DatePicker } from '@/components/custom/date-picker/DatePicker'
import { Button } from '@/components/ui/button'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	equipmentSetQuality,
	equipmentSetTypeGroups,
} from '@/mocks/equipment.mock'
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
								<FormField
									control={control}
									name="importPlanNumber"
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
									name="quality"
									render={({ field: { value, onChange } }) => (
										<FormItem key={value}>
											<FormLabel>Chất lượng</FormLabel>
											<FormControl>
												<Select value={value} onValueChange={onChange}>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Chất lượng" />
													</SelectTrigger>
													<SelectContent>
														{equipmentSetQuality.map((quantity) => (
															<SelectItem key={quantity.id} value={quantity.id}>
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
									name="unit"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Đơn vị</FormLabel>
											<FormControl>
												<Input placeholder="Đơn vị" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="typeGroup"
									render={({ field: { value, onChange } }) => (
										<FormItem key={value}>
											<FormLabel>Nhóm loại</FormLabel>
											<FormControl>
												<Select value={value} onValueChange={onChange}>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Nhóm loại" />
													</SelectTrigger>
													<SelectContent>
														{equipmentSetTypeGroups.map((typeGroup) => (
															<SelectItem
																key={typeGroup.id}
																value={typeGroup.id}
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
									name="origin"
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
									control={control}
									name="specs"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cấu hình tính năng</FormLabel>
											<FormControl>
												<Input placeholder="Cấu hình tính năng" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="featureConfig"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cấu hình tính năng</FormLabel>
											<FormControl>
												<Input placeholder="Cấu hình tính năng" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="specs"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Thông số kỹ thuật</FormLabel>
											<FormControl>
												<Input placeholder="Thông số kỹ thuật" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="country"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nước sản xuât</FormLabel>
											<FormControl>
												<Input placeholder="Nước sản xuât" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="syncComponent"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Thành phần đồng bộ</FormLabel>
											<FormControl>
												<Input placeholder="Thành phần đồng bộ" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<div className="flex justify-end">
								<Button>Tìm kiếm</Button>
							</div>
						</Form>
					</Card>
				</CollapsibleContent>
			</Collapsible>
		</div>
	)
}

export default SearchEquipmentSet
