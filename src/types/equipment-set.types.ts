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

type EquipmentSet = {
	id: string
	name: string
	serial: string
	importDate: string
	importPlanNumber: number
	origin: string
	amount: number
	manufacturingDate: string
	importUnit: string
	rateUnit: string
	rateResult: string
	usedUnit: string
	quality: string
	status: string
	createdAt: string
	updatedAt: string
}

type Handover = {
	id: string
	code: string
	handoverPerson: string
	handoverUnit: string
	receiverPerson: string
	receiverUnit: string
	handoverDate: string
	returnDate: string
	equipmentName: string
	equipmentSerial: string
	equipmentQuantity: number
	equipmentStatus: string
	note: string
}

export type {
	EquipmentSetTypeGroup,
	EquipmentSetQuality,
	EquipmentSetCategory,
	EquipmentSet,
	Handover,
}
