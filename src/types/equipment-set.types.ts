type EquipmentSetTypeGroup = {
	id: string
	name: string
	code: string
	note: string
	createdAt: string
	updatedAt: string
}

type EquipmentSetQuality = {
	id: string
	name: string
	code: string
	note: string
	createdAt: string
	updatedAt: string
}

type EquipmentSetCategory = {
	id: string
	name: string
	type: string
	field: string
	defaultAmount: number
	note: string
	createdAt: string
	updatedAt: string
}

export type { EquipmentSetTypeGroup, EquipmentSetQuality, EquipmentSetCategory }
