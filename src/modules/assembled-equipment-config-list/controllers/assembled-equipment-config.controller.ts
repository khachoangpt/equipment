import { useForm } from 'react-hook-form'

const useAssembledEquipmentConfigController = () => {
	const form = useForm()

	return { form }
}

export default useAssembledEquipmentConfigController
