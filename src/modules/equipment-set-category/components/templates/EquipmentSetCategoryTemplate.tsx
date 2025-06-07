import EquipmentSetQuality from '../organisms/EquipmentSetQuality'
import EquipmentSetTypeGroup from '../organisms/EquipmentSetTypeGroup'

const EquipmentSetCategoryTemplate = () => {
	return (
		<div className="grid grid-cols-2 gap-5">
			<EquipmentSetTypeGroup />
			<EquipmentSetQuality />
			{/* <EquipmentSetCategory /> */}
		</div>
	)
}

export default EquipmentSetCategoryTemplate
