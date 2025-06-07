export type StaticPageMeta = {
	title: string
	href: string
	isAuth: boolean
	pattern: string[]
}

type DynamicPageMeta = (config: object) => StaticPageMeta

export type PageMeta = StaticPageMeta | DynamicPageMeta

export const pageList = {
	login: {
		title: 'Login',
		href: '/login',
		isAuth: false,
		pattern: ['login'],
	},
	maintenance: {
		title: 'Maintenance',
		href: '/maintenance',
		isAuth: false,
		pattern: ['maintenance'],
	},
	account: {
		title: 'Account',
		href: '/account',
		isAuth: true,
		pattern: ['account'],
	},
	accountDetail: (config?: { id?: string }) => ({
		title: 'Account Detail',
		href: `/account/${config?.id}`,
		isAuth: true,
		pattern: ['account', ''],
	}),
	accountCreate: {
		title: 'Account Create',
		href: '/account/create',
		isAuth: true,
		pattern: ['account', 'create'],
	},
	equipmentSet: {
		title: 'Equipment Set',
		href: '/equipment-set',
		isAuth: true,
		pattern: ['equipment-set'],
	},
	equipmentSetDetail: (config?: { id?: string }) => ({
		title: 'Equipment Set Detail',
		href: `/equipment-set/${config?.id}`,
		isAuth: true,
		pattern: ['equipment-set', ''],
	}),
	equipmentSetCreate: {
		title: 'Equipment Set Create',
		href: '/equipment-set/create',
		isAuth: true,
		pattern: ['equipment-set', 'create'],
	},
	equipmentSetCategory: {
		title: 'Equipment Set Category',
		href: '/equipment-set/category',
		isAuth: true,
		pattern: ['equipment-set', 'category'],
	},
	equipmentSetHandover: {
		title: 'Equipment Set Handover',
		href: '/equipment-set/handover',
		isAuth: true,
		pattern: ['equipment-set', 'handover'],
	},
	createEquipmentSetHandover: {
		title: 'Create Equipment Set Handover',
		href: '/equipment-set/handover/create',
		isAuth: true,
		pattern: ['equipment-set', 'handover', 'create'],
	},
	equipmentSetHandoverDetail: (config?: { id?: string }) => ({
		title: 'Create Equipment Set Handover',
		href: `/equipment-set/handover/${config?.id}`,
		isAuth: true,
		pattern: ['equipment-set', 'handover', ''],
	}),
	assembledEquipment: {
		title: 'Assembled Equipment',
		href: '/assembled-equipment',
		isAuth: true,
		pattern: ['assembled-equipment'],
	},
	home: {
		title: 'Home',
		href: '/',
		isAuth: true,
		pattern: [''],
	},
}

export const pathList: PageMeta[] = Object.values(pageList)
