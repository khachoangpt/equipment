'use client'

import { organizationControllerFindAllUnitsOptions } from '@/client/@tanstack/react-query.gen'
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
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import useAccountDetailController from '../../controllers/unit-detail.controller'

type Props = {
	id?: string
}

const EditUnitForm = ({ id }: Props) => {
	const router = useRouter()
	const { unitDetailForm, onSubmit } = useAccountDetailController({ id })
	const { control, handleSubmit } = unitDetailForm
	const { data: units } = useQuery({
		...organizationControllerFindAllUnitsOptions(),
		select: (data) =>
			(data as any)?.map((unit: any) => ({
				label: unit.name,
				value: unit._id,
			})),
	})

	return (
		<Card className="px-5">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Form {...unitDetailForm}>
					<div className="grid grid-cols-2 gap-5">
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên</FormLabel>
									<FormControl>
										<Input placeholder="Tên" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mã đơn vị</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="parentUnitId"
							render={({ field: { onChange, value, ...rest } }) => {
								return (
									<FormItem key={value}>
										<FormLabel>Đơn vị chính</FormLabel>
										<Select value={value} onValueChange={onChange} {...rest}>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{units?.map((item: any) => (
													<SelectItem
														key={item.value}
														value={item.value?.toString()}
													>
														{item.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="mt-10 flex items-center justify-end gap-x-5">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								router.push(pageList.account.href)
							}}
						>
							Quay lại
						</Button>
						<Button type="submit">{id ? 'Cập nhật' : 'Thêm'}</Button>
					</div>
				</Form>
			</form>
		</Card>
	)
}

export default EditUnitForm
