import {
	type SearchEquipmentSetSchema,
	searchEquipmentSetSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const useSearchEquipmentSetController = () => {
	const defaultValues: SearchEquipmentSetSchema = {
		country: '',
		featureConfig: '',
		origin: '',
		specs: '',
		typeGroup: '',
		unit: '',
		syncComponent: '',
		importDate: new Date().toString(),
		importPlanNumber: 0,
		name: '',
		quality: '',
		serial: '',
		status: '',
	}
	const form = useForm({
		defaultValues,
		resolver: zodResolver(searchEquipmentSetSchema),
	})

	return { form }
}

export default useSearchEquipmentSetController
