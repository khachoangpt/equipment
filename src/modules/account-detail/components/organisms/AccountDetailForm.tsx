'use client'

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
import { useRouter } from 'next/navigation'
import useAccountDetailController from '../../controllers/account-detail.controller'

type Props = {
	id?: string
}

const EditAccountForm = ({ id }: Props) => {
	const router = useRouter()
	const { accountDetailForm, onSubmit } = useAccountDetailController({ id })
	const { control, handleSubmit } = accountDetailForm
	const selectItems = [
		{
			label: 'Quản trị viên',
			value: 'admin',
		},
		{
			label: 'Người dùng',
			value: 'user',
		},
	]

	return (
		<Card className="px-5">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Form {...accountDetailForm}>
					<div className="grid grid-cols-2 gap-5">
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Họ tên</FormLabel>
									<FormControl>
										<Input placeholder="Họ tên" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="role"
							render={({ field: { onChange, value, ...rest } }) => {
								return (
									<FormItem key={value}>
										<FormLabel>Vai trò</FormLabel>
										<Select value={value} onValueChange={onChange} {...rest}>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Vai trò" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{selectItems.map((item) => (
													<SelectItem
														key={item.value}
														value={item.value.toString()}
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
						{!id && (
							<>
								<FormField
									control={control}
									name="username"
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel>Tên đăng nhập</FormLabel>
												<FormControl>
													<Input placeholder="Tên đăng nhập" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)
									}}
								/>
								<FormField
									control={control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Mật khẩu</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="Mật khẩu"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
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

export default EditAccountForm
