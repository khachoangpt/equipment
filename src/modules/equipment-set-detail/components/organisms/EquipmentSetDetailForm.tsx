'use client'

import { DatePicker } from '@/components/custom/date-picker/DatePicker'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { pageList } from '@/configs/routes'
import { equipmentSetQuality } from '@/mocks/equipment.mock'
import { useRouter } from 'next/navigation'
import useEquipmentSetDetailController from '../../controllers/equipment-set-detail.controller'

type Props = {
	id?: string
}

const EquipmentSetDetailForm = ({ id }: Props) => {
	const router = useRouter()
	const { form } = useEquipmentSetDetailController({ id })

	return (
		<div>
			<Card>
				<Form {...form}>
					<div className="grid gap-y-5 gap-x-20 grid-cols-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên trang bị</FormLabel>
									<FormControl>
										<Input placeholder="Tên trang bị" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="serial"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mã hiệu serial</FormLabel>
									<FormControl>
										<Input placeholder="Mã hiệu serial" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="importDate"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Ngày nhập</FormLabel>
									<FormControl>
										<DatePicker onChange={onChange} value={new Date(value)} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="importPlanNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số kế hoạch nhập</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Số kế hoạch nhập"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="origin"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nguồn cấp</FormLabel>
									<FormControl>
										<Input placeholder="Nguồn cấp" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giá tiền hiện tại</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Giá tiền hiện tại"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="manufacturingDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ngày sản xuất</FormLabel>
									<FormControl>
										<Input placeholder="Ngày sản xuất" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="importUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đơn vị nhập</FormLabel>
									<FormControl>
										<Input placeholder="Đơn vị nhập" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="rateUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đơn vị đánh giá</FormLabel>
									<FormControl>
										<Input placeholder="Đơn vị đánh giá" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="rateResult"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Kết quả đánh giá</FormLabel>
									<FormControl>
										<Input placeholder="Kết quả đánh giá" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="usedUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đơn vị sử dụng</FormLabel>
									<FormControl>
										<Input placeholder="Đơn vị sử dụng" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="quality"
							render={({ field: { value, onChange } }) => (
								<FormItem key={value}>
									<FormLabel>Phân cấp chất lượng</FormLabel>
									<FormControl>
										<Select value={value} onValueChange={onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Phân cấp chất lượng" />
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
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tình trạng trang bị</FormLabel>
									<FormControl>
										<Input placeholder="Tình trạng trang bị" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="mt-10 flex items-center justify-end gap-x-5">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								router.push(pageList.equipmentSet.href)
							}}
						>
							Quay lại
						</Button>
						<Button type="submit">{id ? 'Cập nhật' : 'Thêm'}</Button>
					</div>
				</Form>
			</Card>
		</div>
	)
}

export default EquipmentSetDetailForm
