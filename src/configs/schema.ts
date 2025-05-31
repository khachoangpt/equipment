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

const accountSchema = z
	.object({
		mode: z.string(),
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
	.refine(
		({ mode }) => {
			return mode === 'edit'
		},
		{ path: ['password'], message: 'Chưa nhập mật khẩu' },
	)

type AccountSchema = z.infer<typeof accountSchema>

const typeGroupDetailSchema = z.object({
	name: z
		.string({ required_error: 'Chưa nhập tên nhóm' })
		.trim()
		.min(1, 'Chưa nhập tên nhóm'),
	code: z
		.string({ required_error: 'Chưa nhập mã nhóm' })
		.trim()
		.min(1, 'Chưa nhập mã nhóm'),
	note: z.string().optional(),
})
type TypeGroupDetailSchema = z.infer<typeof typeGroupDetailSchema>

const qualityDetailSchema = z.object({
	name: z
		.string({ required_error: 'Chưa nhập tên phân cấp' })
		.trim()
		.min(1, 'Chưa nhập tên phân cấp'),
	code: z
		.string({ required_error: 'Chưa nhập mã phân cấp' })
		.trim()
		.min(1, 'Chưa nhập mã phân cấp'),
	note: z.string().optional(),
})
type QualityDetailSchema = z.infer<typeof qualityDetailSchema>

export {
	loginSchema,
	accountSchema,
	typeGroupDetailSchema,
	qualityDetailSchema,
}

export type {
	LoginSchema,
	AccountSchema,
	TypeGroupDetailSchema,
	QualityDetailSchema,
}
