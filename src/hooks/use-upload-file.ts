import { equipmentInstancesControllerUploadFilesMutation } from '@/client/@tanstack/react-query.gen'
import { useMutation } from '@tanstack/react-query'

const useUploadFile = () => {
	const { mutate } = useMutation({
		...equipmentInstancesControllerUploadFilesMutation(),
	})

	return {
		uploadFile: mutate,
	}
}

export default useUploadFile
