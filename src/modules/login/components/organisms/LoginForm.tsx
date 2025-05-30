'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {} from '@mui/material'
import useLoginController from '../../controllers/login.controller'

const LoginForm = () => {
	const { loginForm, onSubmit } = useLoginController()
	const { control, handleSubmit } = loginForm

	return (
		<div className="w-sm rounded-xl bg-white p-8 shadow-xl">
			<h2 className="mb-6 font-bold text-3xl">Đăng nhập</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Form {...loginForm}>
					<div className="flex flex-col gap-y-6">
						<FormField
							control={control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên đăng nhập</FormLabel>
									<FormControl>
										<Input placeholder="Tên đăng nhập" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mật khẩu</FormLabel>
									<FormControl>
										<Input placeholder="Mật khẩu" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="mt-6">
						<Button
							type="submit"
							className="w-full"
							variant="default"
							size="lg"
						>
							Đăng Nhập
						</Button>
					</div>
				</Form>
			</form>
		</div>
	)
}

export default LoginForm
