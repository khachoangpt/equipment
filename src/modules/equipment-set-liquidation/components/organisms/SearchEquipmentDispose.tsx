import { DatePicker } from '@/components/custom/date-picker/DatePicker'
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
import {} from '@/components/ui/select'
import { parseAsString, useQueryStates } from 'nuqs'
import useSearchEquipmentDisposeController from '../../controllers/search-equipment-dispose.controller'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const SearchEquipmentDispose = ({ onOpenChange, open }: Props) => {
	const { form, onSubmit, defaultValues } =
		useSearchEquipmentDisposeController()
	const { control } = form
	const [_, setSearchQuery] = useQueryStates({
		createdById: parseAsString.withDefault(''),
		decisionNumber: parseAsString.withDefault(''),
		disposalDateEnd: parseAsString.withDefault(''),
		disposalDateStart: parseAsString.withDefault(''),
		equipmentQuery: parseAsString.withDefault(''),
		search: parseAsString.withDefault(''),
		signer: parseAsString.withDefault(''),
		unitId: parseAsString.withDefault(''),
	})
	// const { data: units } = useQuery({
	// 	...unitsControllerFindAllOptions(),
	// 	select(data) {
	// 		return data?.data
	// 	},
	// })

	return (
		<div>
			<Collapsible open={open} onOpenChange={onOpenChange}>
				<CollapsibleContent>
					<Form {...form}>
						<div className="grid grid-cols-3 gap-x-10 gap-y-3">
							<FormField
								control={control}
								name="createdById"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Người lập</FormLabel>
										<FormControl>
											<Input placeholder="Người lập" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="decisionNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Số quyết định</FormLabel>
										<FormControl>
											<Input placeholder="Số quyết định" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="equipmentQuery"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên trang bị</FormLabel>
										<FormControl>
											<Input placeholder="Tên trang bị" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="flex gap-x-3 items-end">
								<FormField
									control={form.control}
									name="disposalDateStart"
									render={({ field: { onChange, value } }) => (
										<FormItem className="w-full">
											<FormLabel>Ngày thanh lý</FormLabel>
											<FormControl>
												<DatePicker
													onChange={(e) => onChange(e.toISOString())}
													value={value ? new Date(value ?? '') : undefined}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<div className="h-9 translate-y-2">~</div>
								<FormField
									control={form.control}
									name="disposalDateEnd"
									render={({ field: { onChange, value } }) => (
										<FormItem className="w-full">
											<FormLabel className="invisible">Ngày thanh lý</FormLabel>
											<FormControl>
												<DatePicker
													onChange={(e) => onChange(e.toISOString())}
													value={value ? new Date(value ?? '') : undefined}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={control}
								name="signer"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Người ký</FormLabel>
										<FormControl>
											<Input placeholder="Người ký" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							{/* <FormField
								control={control}
								name="reportNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Số biên bản</FormLabel>
										<FormControl>
											<Input placeholder="Số biên bản" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="fromUnitId"
								render={({ field: { value, onChange } }) => (
									<FormItem>
										<FormLabel>Đơn vị giao</FormLabel>
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
								name="toUnitId"
								render={({ field: { value, onChange } }) => (
									<FormItem>
										<FormLabel>Đơn vị nhận</FormLabel>
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
							<div className="flex gap-x-3 items-end">
								<FormField
									control={form.control}
									name="handoverDateStart"
									render={({ field: { onChange, value } }) => (
										<FormItem className="w-full">
											<FormLabel>Ngày bàn giao</FormLabel>
											<FormControl>
												<DatePicker
													onChange={(e) => onChange(e.toISOString())}
													value={value ? new Date(value ?? '') : undefined}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<div className="h-9 translate-y-2">~</div>
								<FormField
									control={form.control}
									name="handoverDateEnd"
									render={({ field: { onChange, value } }) => (
										<FormItem className="w-full">
											<FormLabel className="invisible">Ngày bàn giao</FormLabel>
											<FormControl>
												<DatePicker
													onChange={(e) => onChange(e.toISOString())}
													value={value ? new Date(value ?? '') : undefined}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={control}
								name="createdById"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Người giao</FormLabel>
										<FormControl>
											<Input placeholder="Người giao" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="receiverId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Người nhận</FormLabel>
										<FormControl>
											<Input placeholder="Người nhận" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="equipmentQuery"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên trang bị</FormLabel>
										<FormControl>
											<Input placeholder="Tên trang bị" {...field} />
										</FormControl>
									</FormItem>
								)}
							/> */}
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

export default SearchEquipmentDispose
