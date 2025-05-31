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

const accountSchema = z.object({
	name: z
		.string({ required_error: 'Chưa nhập tên' })
		.trim()
		.min(1, 'Chưa nhập tên'),
	username: z
		.string({ required_error: 'Chưa nhập tên đăng nhập' })
		.trim()
		.min(1, 'Chưa nhập tên đăng nhập')
		.regex(/^[a-zA-Z0-9]+$/, 'Tên đăng nhập chỉ bao gồm chữ cái và số'),
	password: z.string().optional(),
	role: z
		.string({ required_error: 'Chưa chọn vai trò' })
		.trim()
		.min(1, 'Chưa chọn vai trò'),
})

type AccountSchema = z.infer<typeof accountSchema>

export { loginSchema, accountSchema }

export type { LoginSchema, AccountSchema }
