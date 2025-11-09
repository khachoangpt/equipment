import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

type Props = {
	value?: Date
	onChange: (value: Date) => void
	className?: string
	modal?: boolean
}

export const DatePicker = ({
	onChange,
	value,
	className,
	modal = false,
}: Props) => {
	return (
		<Popover modal={modal}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'justify-start text-left font-normal',
						!value && 'text-muted-foreground',
						className,
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{value ? (
						format(value, 'P', { locale: vi })
					) : (
						<span>Chọn một ngày</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					locale={vi}
					mode="single"
					selected={value}
					onSelect={(e) => onChange(new Date(e?.getTime() || 0))}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
