'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PageTitle from '@/modules/common/components/molecules/PageTitle'
import useGeneralSettingsController from '../../controllers/general-settings.controller'

const GeneralSettingsTemplate = () => {
	const pageTitle = 'Thiết lập phân trang'
	const { form, onSubmit } = useGeneralSettingsController()

	return (
		<div>
			<PageTitle title={pageTitle} />
			<div>
				<Card>
					<Form {...form}>
						<div className="grid gap-y-5 gap-x-20 grid-cols-2">
							<FormField
								control={form.control}
								name="pageSize"
								render={({ field: { onChange, value } }) => (
									<FormItem>
										<FormLabel>Kích thước trang</FormLabel>
										<FormControl>
											<Input onChange={onChange} value={value} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="mt-10 flex items-center justify-end gap-x-5">
							<Button onClick={form.handleSubmit(onSubmit)}>Cập nhật</Button>
						</div>
					</Form>
				</Card>
			</div>
		</div>
	)
}

export default GeneralSettingsTemplate
