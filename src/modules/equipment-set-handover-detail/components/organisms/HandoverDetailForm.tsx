'use client'

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
import useHandoverDetailController from '../../controllers/handover-detail.controller'

type Props = {
	id?: string
}

const HandoverDetailForm = ({ id }: Props) => {
	const { form } = useHandoverDetailController({ id })
	const { control } = form

	return (
		<div>
			<Card>
				<Form {...form}>
					<div className="grid gap-y-5 gap-x-20 grid-cols-2">
						<FormField
							control={control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số biên bản</FormLabel>
									<FormControl>
										<Input placeholder="Số biên bản" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="handoverPerson"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Người giao</FormLabel>
									<FormControl>
										<Input placeholder="Người giao" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="handoverUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đơn vị giao</FormLabel>
									<FormControl>
										<Input placeholder="Đơn vị giao" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="receiverPerson"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Người nhận</FormLabel>
									<FormControl>
										<Input placeholder="Người nhận" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="handoverUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đơn vị nhận</FormLabel>
									<FormControl>
										<Input placeholder="Đơn vị nhận" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="handoverDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Người giao</FormLabel>
									<FormControl>
										<Input placeholder="Người giao" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</Form>
			</Card>
		</div>
	)
}

export default HandoverDetailForm
