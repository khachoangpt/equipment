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

const categoryEquipmentSetDetailSchema = z.object({
	name: z
		.string({ required_error: 'Chưa nhập tên danh mục' })
		.trim()
		.min(1, 'Chưa nhập tên danh mục'),
	type: z
		.string({ required_error: 'Chưa chọn nhóm loại' })
		.trim()
		.min(1, 'Chưa chọn nhóm loại'),
	field: z
		.string({ required_error: 'Chưa chọn lĩnh vực' })
		.trim()
		.min(1, 'Chưa chọn lĩnh vực'),
	defaultAmount: z
		.number({
			required_error: 'Chưa nhập số tiền ban đầu',
			invalid_type_error: 'Chưa nhập số tiền ban đầu',
		})
		.min(0, 'Số tiền phải lớn hơn 0'),
	note: z.string().optional(),
})
type CategoryEquipmentSetDetailSchema = z.infer<
	typeof categoryEquipmentSetDetailSchema
>

export {
	loginSchema,
	accountSchema,
	typeGroupDetailSchema,
	qualityDetailSchema,
	categoryEquipmentSetDetailSchema,
}

export type {
	LoginSchema,
	AccountSchema,
	TypeGroupDetailSchema,
	QualityDetailSchema,
	CategoryEquipmentSetDetailSchema,
}
