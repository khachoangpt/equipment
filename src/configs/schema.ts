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

const equipmentSetDetailSchema = z.object({
	name: z
		.string({ required_error: 'Chưa nhập tên trang bị' })
		.trim()
		.min(1, 'Chưa nhập tên trang bị'),
	serial: z
		.string({ required_error: 'Chưa nhập mã hiệu serial' })
		.trim()
		.min(1, 'Chưa nhập má hiệu serial'),
	importDate: z
		.string({ required_error: 'Chưa nhập ngày nhập' })
		.trim()
		.min(1, 'Chưa nhập ngày nhập'),
	importPlanNumber: z
		.number({
			required_error: 'Chưa nhập số kế hoạch nhập',
			invalid_type_error: 'Chưa nhập số kế hoạch nhập',
		})
		.min(0, 'Số kế hoạch nhập phải lớn hơn 0'),
	origin: z
		.string({ required_error: 'Chưa nhập nguồn cấp' })
		.trim()
		.min(1, 'Chưa nhập nguồn cấp'),
	amount: z
		.number({
			required_error: 'Chưa nhập số tiền',
			invalid_type_error: 'Chưa nhập số tiền',
		})
		.min(0, 'Số tiền phải lớn hơn 0'),
	manufacturingDate: z
		.string({ required_error: 'Chưa nhập ngày sản xuất' })
		.trim()
		.min(1, 'Chưa nhập ngày sản xuất'),
	importUnit: z
		.string({ required_error: 'Chưa nhập đơn vị nhập' })
		.trim()
		.min(1, 'Chưa nhập đơn vị nhập'),
	rateUnit: z
		.string({ required_error: 'Chưa nhập đơn vị đánh giá' })
		.trim()
		.min(1, 'Chưa nhập đơn vị đánh giá'),
	rateResult: z
		.string({ required_error: 'Chưa nhập kết 	quả đánh giá' })
		.trim()
		.min(1, 'Chưa nhập kết 	quả đánh giá'),
	usedUnit: z
		.string({ required_error: 'Chưa nhập đơn vị sử dụng' })
		.trim()
		.min(1, 'Chưa nhập đơn vị sử dụng'),
	quality: z
		.string({ required_error: 'Chưa nhập phân cấp chất lượng' })
		.min(1, 'Chưa nhập phân cấp chất lượng'),
	status: z
		.string({ required_error: 'Chưa nhập trang thái' })
		.trim()
		.min(1, 'Chưa nhập trang thái'),
})
type EquipmentSetDetailSchema = z.infer<typeof equipmentSetDetailSchema>

const searchEquipmentSetSchema = z.object({
	name: z.string().optional(),
	serial: z.string().optional(),
	importDate: z.string().optional(),
	importPlanNumber: z.number().optional(),
	quality: z.string().optional(),
	status: z.string().optional(),
	unit: z.string().optional(),
	typeGroup: z.string().optional(),
	origin: z.string().optional(),
	featureConfig: z.string().optional(),
	specs: z.string().optional(),
	country: z.string().optional(),
	syncComponent: z.string().optional(),
})
type SearchEquipmentSetSchema = z.infer<typeof searchEquipmentSetSchema>

const createEquipmentSetHandoverSchema = z.object({
	code: z.string({ required_error: 'Chưa nhập số biên bản' }),
	handoverPerson: z.string({ required_error: 'Chưa nhập người giao' }),
	handoverUnit: z.string({ required_error: 'Chưa nhập đơn vị giao' }),
	receiverPerson: z.string({ required_error: 'Chưa nhập người nhận' }),
	receiverUnit: z.string({ required_error: 'Chưa nhập đơn vị nhận' }),
	handoverDate: z.string({ required_error: 'Chưa nhập ngày giao' }),
	returnDate: z.string({ required_error: 'Chưa nhập ngày nhận' }),
	equipmentName: z.string({ required_error: 'Chưa nhập tên trang bị' }),
	note: z.string().optional(),
})
type CreateEquipmentSetHandoverSchema = z.infer<
	typeof createEquipmentSetHandoverSchema
>

export {
	loginSchema,
	accountSchema,
	typeGroupDetailSchema,
	qualityDetailSchema,
	categoryEquipmentSetDetailSchema,
	equipmentSetDetailSchema,
	searchEquipmentSetSchema,
	createEquipmentSetHandoverSchema,
}

export type {
	LoginSchema,
	AccountSchema,
	TypeGroupDetailSchema,
	QualityDetailSchema,
	CategoryEquipmentSetDetailSchema,
	EquipmentSetDetailSchema,
	SearchEquipmentSetSchema,
	CreateEquipmentSetHandoverSchema,
}
