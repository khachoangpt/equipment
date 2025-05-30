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
	equipmentSet: {
		title: 'Equipment Set',
		href: '/equipment-set',
		isAuth: true,
		pattern: ['equipment-set'],
	},
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
