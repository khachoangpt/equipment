import { settingsControllerFindAllOptions } from '@/client/@tanstack/react-query.gen'
import { useQuery } from '@tanstack/react-query'

const useGetGeneralSettings = () => {
	const { data: settings, isFetching } = useQuery({
		...settingsControllerFindAllOptions(),
	})

	return {
		settings: settings?.[0] || { pagingSize: 10 },
		isFetchingGeneralSettings: isFetching,
	}
}

export default useGetGeneralSettings
