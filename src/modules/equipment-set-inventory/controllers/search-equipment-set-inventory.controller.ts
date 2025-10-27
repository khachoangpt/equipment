import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryStates } from 'nuqs'
import { parseAsString } from 'nuqs'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchEquipmentSetInventorySchema = z.object({
	serialNumber: z.string().optional(),
	name: z.string().optional(),
	entryPlanNumber: z.string().optional(),
	qualityLevelId: z.string().optional(),
	status: z.string().optional(),
	usingUnitId: z.string().optional(),
	countryOfOrigin: z.string().optional(),
	groupId: z.string().optional(),
	featureConfiguration: z.string().optional(),
	technicalSpecifications: z.string().optional(),
})

type SearchEquipmentSetInventoryForm = z.infer<
	typeof searchEquipmentSetInventorySchema
>

const useSearchEquipmentSetInventoryController = () => {
	const [searchQuery, setSearchQuery] = useQueryStates({
		serialNumber: parseAsString.withDefault(''),
		name: parseAsString.withDefault(''),
		entryPlanNumber: parseAsString.withDefault(''),
		qualityLevelId: parseAsString.withDefault(''),
		status: parseAsString.withDefault(''),
		usingUnitId: parseAsString.withDefault(''),
		countryOfOrigin: parseAsString.withDefault(''),
		groupId: parseAsString.withDefault(''),
		featureConfiguration: parseAsString.withDefault(''),
		technicalSpecifications: parseAsString.withDefault(''),
	})

	const form = useForm<SearchEquipmentSetInventoryForm>({
		resolver: zodResolver(searchEquipmentSetInventorySchema),
		defaultValues: {
			serialNumber: searchQuery.serialNumber,
			name: searchQuery.name,
			entryPlanNumber: searchQuery.entryPlanNumber,
			qualityLevelId: searchQuery.qualityLevelId,
			status: searchQuery.status,
			usingUnitId: searchQuery.usingUnitId,
			countryOfOrigin: searchQuery.countryOfOrigin,
			groupId: searchQuery.groupId,
			featureConfiguration: searchQuery.featureConfiguration,
			technicalSpecifications: searchQuery.technicalSpecifications,
		},
	})

	const onSubmit = (data: SearchEquipmentSetInventoryForm) => {
		setSearchQuery(data)
	}

	return {
		form,
		onSubmit,
	}
}

export default useSearchEquipmentSetInventoryController
