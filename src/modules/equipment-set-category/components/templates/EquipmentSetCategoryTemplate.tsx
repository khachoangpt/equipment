import EquipmentSetCategory from '../organisms/EquipmentSetCategory'
import EquipmentSetQuality from '../organisms/EquipmentSetQuality'
import EquipmentSetTypeGroup from '../organisms/EquipmentSetTypeGroup'

const EquipmentSetCategoryTemplate = () => {
	return (
		<div className="space-y-5">
			<EquipmentSetTypeGroup />
			<EquipmentSetQuality />
			<EquipmentSetCategory />
		</div>
	)
}

export default EquipmentSetCategoryTemplate
