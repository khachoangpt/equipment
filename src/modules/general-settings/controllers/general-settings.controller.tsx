import {
	settingsControllerCreateMutation,
	settingsControllerFindAllOptions,
	settingsControllerFindAllQueryKey,
	settingsControllerUpdateMutation,
} from '@/client/@tanstack/react-query.gen'
import { queryClient } from '@/configs/query-client'
import {
	type GeneralSettingsSchema,
	generalSettingsSchema,
} from '@/configs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const useGeneralSettingsController = () => {
	const defaultValues: GeneralSettingsSchema = {
		pageSize: 10,
	}
	const form = useForm<GeneralSettingsSchema>({
		defaultValues,
		resolver: zodResolver(generalSettingsSchema),
	})
	const { mutate: create } = useMutation({
		...settingsControllerCreateMutation(),
	})
	const { mutate: update } = useMutation({
		...settingsControllerUpdateMutation(),
	})
	const { data: settings, isPending } = useQuery({
		...settingsControllerFindAllOptions(),
	})

	useEffect(() => {
		if (isPending) return

		if (settings?.length) {
			form.reset({
				pageSize: (settings as any)?.[0]?.pagingSize,
			})
		}
	}, [isPending])

	const onSubmit: SubmitHandler<GeneralSettingsSchema> = (data) => {
		if ((settings as any)?.length) {
			update(
				{
					path: { id: (settings as any)?.[0]?._id },
					body: { pagingSize: data?.pageSize },
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: settingsControllerFindAllQueryKey(),
						})
						toast.success('Cập nhật thành công')
					},
					onError: (error) => {
						toast.error(
							<div
								dangerouslySetInnerHTML={{
									__html: (error.response?.data as any)?.message,
								}}
							/>,
						)
					},
				},
			)
		} else {
			create(
				{ body: { pagingSize: data?.pageSize } },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: settingsControllerFindAllQueryKey(),
						})
						toast.success('Cập nhật thành công')
					},
					onError: (error) => {
						toast.error(
							<div
								dangerouslySetInnerHTML={{
									__html: (error.response?.data as any)?.message,
								}}
							/>,
						)
					},
				},
			)
		}
	}

	return { form, onSubmit }
}

export default useGeneralSettingsController
