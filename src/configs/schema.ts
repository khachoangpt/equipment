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
		username: z.string().optional(),
		password: z.string().optional(),
		role: z
			.string({ required_error: 'Chưa chọn vai trò' })
			.trim()
			.min(1, 'Chưa chọn vai trò'),
	})
	.refine(
		({ mode, password }) => {
			return mode === 'edit' || (mode === 'create' && password)
		},
		{ path: ['password'], message: 'Chưa nhập mật khẩu' },
	)
	.refine(
		({ mode, username }) => {
			return mode === 'edit' || (mode === 'create' && username)
		},
		{ path: ['username'], message: 'Chưa nhập tên đăng nhập' },
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
	equipmentId: z.string().trim().min(1, 'Chưa nhập ID của loại trang bị'),
	serialNumber: z.string().trim().min(1, 'Chưa nhập mã hiệu serial'),
	currentPrice: z.number().optional(),
	entryDate: z.string().optional(),
	productionDate: z.string().optional(),
	entryPlanNumber: z.string().trim().min(1, 'Chưa nhập số kế hoạch nhập'),
	supplySource: z.string().optional(),
	importingUnitId: z.string().trim().min(1, 'Chưa nhập ID của Đơn vị nhập'),
	usingUnitId: z.string().optional(),
	evaluatingUnitId: z.string().optional(),
	evaluationResult: z.string().optional(),
	qualityLevelId: z
		.string()
		.trim()
		.min(1, 'Chưa nhập ID của Phân cấp chất lượng'),
	status: z.string().optional(),
	quantity: z
		.number({
			required_error: 'Chưa nhập số lượng',
			coerce: true,
			invalid_type_error: 'Số lượng không hợp lệ',
		})
		.min(0, 'Số lượng phải lớn hơn hoặc bằng 0')
		.optional(),
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
	senderPerson: z.string({ required_error: 'Chưa nhập người giao' }),
	receiverPerson: z.string({ required_error: 'Chưa nhập người nhận' }),
	receiverUnit: z.string({ required_error: 'Chưa nhập đơn vị nhận' }),
	handoverDate: z.string({ required_error: 'Chưa nhập ngày giao' }),
	equipment: z.string({ required_error: 'Chưa nhập trang bị' }),
	note: z.string().optional(),
})
type CreateEquipmentSetHandoverSchema = z.infer<
	typeof createEquipmentSetHandoverSchema
>

const createEquipmentMaintenanceSchema = z.object({
	reportNumber: z
		.string({ required_error: 'Chưa nhập số biên bản' })
		.trim()
		.min(1, 'Chưa nhập số biên bản'),
	equipment: z
		.string({ required_error: 'Chưa nhập trang bị' })
		.trim()
		.min(1, 'Chưa nhập trang bị'),
	repairLocation: z
		.string({ required_error: 'Chưa nhập nơi sửa chữa' })
		.trim()
		.min(1, 'Chưa nhập nơi sửa chữa'),
	sentDate: z.string({ required_error: 'Chưa nhập ngày gửi đi sửa chữa' }),
	receivedDate: z.string().optional(),
	sender: z
		.string({ required_error: 'Chưa nhập người gửi đi sửa' })
		.trim()
		.min(1, 'Chưa nhập người gửi đi sửa'),
	receiver: z.string().optional(),
	reason: z
		.string({ required_error: 'Chưa nhập lý do' })
		.trim()
		.min(1, 'Chưa nhập lý do'),
	result: z.string().optional(),
	notes: z.string().optional(),
})
type CreateEquipmentMaintenanceSchema = z.infer<
	typeof createEquipmentMaintenanceSchema
>

const createEquipmentDisposalSchema = z.object({
	decisionNumber: z
		.string({ required_error: 'Chưa nhập số quyết định thanh lý' })
		.trim()
		.min(1, 'Chưa nhập số quyết định thanh lý'),
	equipment: z
		.string({ required_error: 'Chưa nhập trang bị' })
		.trim()
		.min(1, 'Chưa nhập trang bị'),
	disposalDate: z.string({ required_error: 'Chưa nhập ngày thanh lý' }),
	createdBy: z
		.string({ required_error: 'Chưa nhập người lập' })
		.trim()
		.min(1, 'Chưa nhập người lập'),
	signer: z
		.string({ required_error: 'Chưa nhập người ký quyết định' })
		.trim()
		.min(1, 'Chưa nhập người ký quyết định'),
	notes: z.string().optional(),
})
type CreateEquipmentDisposalSchema = z.infer<
	typeof createEquipmentDisposalSchema
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
	createEquipmentMaintenanceSchema,
	createEquipmentDisposalSchema,
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
	CreateEquipmentMaintenanceSchema,
	CreateEquipmentDisposalSchema,
}
