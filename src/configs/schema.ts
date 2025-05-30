import { z } from 'zod'

const loginSchema = z.object({
	username: z
		.string({ required_error: 'Chưa nhập tên đăng nhập' })
		.trim()
		.min(1, 'Chưa nhập tên đăng nhập'),
	password: z
		.string({ required_error: 'Chưa nhập mật khẩu' })
		.trim()
		.min(1, 'Chưa nhập mật khẩu'),
})
type LoginSchema = z.infer<typeof loginSchema>

export { loginSchema }

export type { LoginSchema }
