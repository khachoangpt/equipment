import { unitsControllerFindAllOptions } from '@/client/@tanstack/react-query.gen'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import useSearchEquipmentHandoverController from '../../controllers/search-equipment-handover.controller'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const SearchEquipmentHandover = ({ onOpenChange, open }: Props) => {
	const { form, onSubmit } = useSearchEquipmentHandoverController()
	const { control } = form

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
						<div className="grid grid-cols-2 gap-x-10 gap-y-3">
							<FormField
								control={control}
								name="reportNumber"
								render={({ field }) => (
									<FormItem className="flex items-center">
										<FormLabel className="w-full">Số biên bản</FormLabel>
										<FormControl>
											<Input placeholder="Số biên bản" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="flex gap-x-3">
								<div className="flex items-center w-full">
									<FormLabel>Ngày bàn giao</FormLabel>
								</div>
								<div className="flex items-center w-full gap-x-3">
									<FormField
										control={form.control}
										name="handoverDateStart"
										render={({ field: { onChange, value } }) => (
											<FormItem className="w-full flex items-center">
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
											<FormItem className="flex items-center">
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
							</div>
							<FormField
								control={control}
								name="fromUnitId"
								render={({ field: { value, onChange } }) => (
									<FormItem className="flex items-center">
										<FormLabel className="w-full">Đơn vị giao</FormLabel>
										<FormControl>
											<Select value={value} onValueChange={onChange}>
												<SelectTrigger
													className="w-full"
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
								control={control}
								name="toUnitId"
								render={({ field: { value, onChange } }) => (
									<FormItem className="flex items-center">
										<FormLabel className="w-full">Đơn vị nhận</FormLabel>
										<FormControl>
											<Select value={value} onValueChange={onChange}>
												<SelectTrigger
													className="w-full"
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
								control={control}
								name="sender"
								render={({ field }) => (
									<FormItem className="flex items-center">
										<FormLabel className="w-full">Người giao</FormLabel>
										<FormControl>
											<Input placeholder="Người giao" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="receiver"
								render={({ field }) => (
									<FormItem className="flex items-center">
										<FormLabel className="w-full">Người nhận</FormLabel>
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
									<FormItem className="flex items-center">
										<FormLabel className="w-full">Tên trang bị</FormLabel>
										<FormControl>
											<Input placeholder="Tên trang bị" {...field} />
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

export default SearchEquipmentHandover
