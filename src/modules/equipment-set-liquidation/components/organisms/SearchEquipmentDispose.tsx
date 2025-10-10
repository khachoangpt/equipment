import { unitsControllerFindAllOptions } from '@/client/@tanstack/react-query.gen'
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
import {} from 'nuqs'
import useSearchEquipmentDisposeController from '../../controllers/search-equipment-dispose.controller'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const SearchEquipmentDispose = ({ onOpenChange, open }: Props) => {
	const { form, onSubmit } = useSearchEquipmentDisposeController()
	const { control } = form

	const { data: units } = useQuery({
		...unitsControllerFindAllOptions(),
		select(data) {
			return data?.data
		},
	})
	const years = Array.from({ length: 101 }, (_, index) => {
		return (index + 2020).toString()
	})

	return (
		<div>
			<Collapsible open={open} onOpenChange={onOpenChange}>
				<CollapsibleContent>
					<Form {...form}>
						<div className="grid grid-cols-2 gap-x-10 gap-y-2">
							<FormField
								control={control}
								name="decisionNumber"
								render={({ field }) => (
									<FormItem className="flex">
										<FormLabel className="w-full">Số quyết định</FormLabel>
										<FormControl>
											<Input placeholder="Số quyết định" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<div />
							<FormField
								control={control}
								name="unitId"
								render={({ field: { value, onChange } }) => (
									<FormItem className="flex">
										<FormLabel className="w-full">Đơn vị giao</FormLabel>
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
								name="year"
								render={({ field: { value, onChange } }) => (
									<FormItem className="flex">
										<FormLabel className="w-full">Năm thanh lý</FormLabel>
										<FormControl>
											<Select value={value} onValueChange={onChange}>
												<SelectTrigger className="w-full">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{years?.map((unit: any) => (
														<SelectItem key={unit} value={unit}>
															{unit}
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
								name="equipmentQuery"
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
										<FormLabel className="w-full">Mã trang bị</FormLabel>
										<FormControl>
											<Input placeholder="Mã trang bị" {...field} />
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

export default SearchEquipmentDispose
