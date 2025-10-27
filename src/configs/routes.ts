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
	unit: {
		title: 'unit',
		href: '/unit',
		isAuth: true,
		pattern: ['unit'],
	},
	unitDetail: (config?: { id?: string }) => ({
		title: 'unit Detail',
		href: `/unit/${config?.id}`,
		isAuth: true,
		pattern: ['unit', ''],
	}),
	unitCreate: {
		title: 'unit Create',
		href: '/unit/create',
		isAuth: true,
		pattern: ['unit', 'create'],
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
	equipmentSetDetailUpdate: (config?: { id?: string }) => ({
		title: 'Equipment Set Detail Update',
		href: `/equipment-set/${config?.id}/update`,
		isAuth: true,
		pattern: ['equipment-set', 'update', ''],
	}),
	equipmentSetDetailHistory: (config?: { id?: string }) => ({
		title: 'Equipment Set Detail History',
		href: `/equipment-set/${config?.id}/history`,
		isAuth: true,
		pattern: ['equipment-set', 'history', ''],
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
		title: 'Equipment Set Handover Detail',
		href: `/equipment-set/handover/${config?.id}`,
		isAuth: true,
		pattern: ['equipment-set', 'handover', ''],
	}),
	equipmentSetHandoverDetailUpdate: (config?: { id?: string }) => ({
		title: 'Equipment Set Handover Detail Update',
		href: `/equipment-set/handover/${config?.id}/update`,
		isAuth: true,
		pattern: ['equipment-set', 'handover', 'update', ''],
	}),
	equipmentSetMaintenance: {
		title: 'Equipment Set maintenance',
		href: '/equipment-set/maintenance',
		isAuth: true,
		pattern: ['equipment-set', 'maintenance'],
	},
	createEquipmentSetMaintenance: {
		title: 'Create Equipment Set maintenance',
		href: '/equipment-set/maintenance/create',
		isAuth: true,
		pattern: ['equipment-set', 'maintenance', 'create'],
	},
	equipmentSetMaintenanceDetail: (config?: { id?: string }) => ({
		title: 'Create Equipment Set maintenance',
		href: `/equipment-set/maintenance/${config?.id}`,
		isAuth: true,
		pattern: ['equipment-set', 'maintenance', ''],
	}),
	equipmentSetLiquidation: {
		title: 'Equipment Set liquidation',
		href: '/equipment-set/liquidation',
		isAuth: true,
		pattern: ['equipment-set', 'liquidation'],
	},
	createEquipmentSetLiquidation: {
		title: 'Create Equipment Set liquidation',
		href: '/equipment-set/liquidation/create',
		isAuth: true,
		pattern: ['equipment-set', 'liquidation', 'create'],
	},
	equipmentSetLiquidationDetail: (config?: { id?: string }) => ({
		title: 'Equipment Set Liquidation Detail',
		href: `/equipment-set/liquidation/${config?.id}`,
		isAuth: true,
		pattern: ['equipment-set', 'liquidation', ''],
	}),
	equipmentSetLiquidationDetailUpdate: (config?: { id?: string }) => ({
		title: 'Equipment Set Liquidation Detail Update',
		href: `/equipment-set/liquidation/${config?.id}/update`,
		isAuth: true,
		pattern: ['equipment-set', 'liquidation', 'update', ''],
	}),
	equipmentSetInventory: {
		title: 'Equipment Set Inventory',
		href: '/equipment-set/inventory',
		isAuth: true,
		pattern: ['equipment-set', 'inventory'],
	},
	assembledEquipment: {
		title: 'Assembled Equipment',
		href: '/assembled-equipment',
		isAuth: true,
		pattern: ['assembled-equipment'],
	},
	assembleEquipmentDetail: (config?: { id?: string }) => ({
		title: 'Assembled Equipment Detail',
		href: `/assembled-equipment/${config?.id}`,
		isAuth: true,
		pattern: ['assembled-equipment', ''],
	}),
	assembleEquipmentDetailUpdate: (config?: { id?: string }) => ({
		title: 'Assembled Equipment Detail Update',
		href: `/assembled-equipment/${config?.id}/update`,
		isAuth: true,
		pattern: ['assembled-equipment', 'update', ''],
	}),
	createAssembledEquipment: {
		title: 'Create Assembled Equipment',
		href: '/assembled-equipment/create',
		isAuth: true,
		pattern: ['assembled-equipment', 'create'],
	},
	assembledEquipmentConfig: {
		title: 'Assembled Equipment Config',
		href: '/assembled-equipment/config',
		isAuth: true,
		pattern: ['assembled-equipment', 'config'],
	},
	assembledEquipmentConfigDetail: (config?: { id?: string }) => ({
		title: 'Assembled Equipment Config',
		href: `/assembled-equipment/config/${config?.id}`,
		isAuth: true,
		pattern: ['assembled-equipment', 'config', ''],
	}),
	assembledEquipmentConfigCreate: {
		title: 'Assembled Equipment Config Create',
		href: '/assembled-equipment/config/create',
		isAuth: true,
		pattern: ['assembled-equipment', 'config', 'create'],
	},
	assembledEquipmentBuild: {
		title: 'Assembled Equipment Build',
		href: '/assembled-equipment/build',
		isAuth: true,
		pattern: ['assembled-equipment', 'build'],
	},
	assembledEquipmentBuildCreate: {
		title: 'Assembled Equipment Build Create',
		href: '/assembled-equipment/build/create',
		isAuth: true,
		pattern: ['assembled-equipment', 'build', 'create'],
	},
	assembledEquipmentBuildDetail: (config?: { id?: string }) => ({
		title: 'Assembled Equipment Build',
		href: `/assembled-equipment/build/${config?.id}`,
		isAuth: true,
		pattern: ['assembled-equipment', 'build', ''],
	}),
	assembledEquipmentComponent: {
		title: 'Assembled Equipment Component',
		href: '/assembled-equipment/component',
		isAuth: true,
		pattern: ['assembled-equipment', 'component'],
	},
	assembleEquipmentDetailComponent: (config?: { id?: string }) => ({
		title: 'Assembled Equipment Detail Component',
		href: `/assembled-equipment/component/${config?.id}`,
		isAuth: true,
		pattern: ['assembled-equipment', 'component', ''],
	}),
	createAssembledEquipmentComponent: {
		title: 'Create Assembled Equipment Component',
		href: '/assembled-equipment/component/create',
		isAuth: true,
		pattern: ['assembled-equipment', 'component', 'create'],
	},
	generalSettings: {
		title: 'General Settings',
		href: '/general-settings',
		isAuth: true,
		pattern: ['general-settings'],
	},
	activityHistory: {
		title: 'Activity History',
		href: '/activity-history',
		isAuth: true,
		pattern: ['activity-history'],
	},
	home: {
		title: 'Home',
		href: '/',
		isAuth: true,
		pattern: [''],
	},
}

export const pathList: PageMeta[] = Object.values(pageList)
