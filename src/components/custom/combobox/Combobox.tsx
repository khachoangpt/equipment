'use client'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

type Props = {
	value: string
	onChange: (value: string) => void
	options: { value: string; label: string }[]
}

const Combobox = ({ onChange, value, options }: Props) => {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					aria-expanded={open}
					className="justify-between font-normal"
				>
					{value ? (
						options.find((option) => option.value === value)?.label
					) : (
						<div className="text-muted-foreground font-normal">Chọn</div>
					)}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
				<Command
					filter={(value, search) => {
						const label =
							options.find((option) => option.value === value)?.label ?? ''
						if (label.toLowerCase().includes(search.toLowerCase())) return 1
						return 0
					}}
				>
					<CommandInput placeholder="Search" className="h-9" />
					<CommandList>
						<CommandEmpty>Không có dữ liệu</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										onChange(currentValue === value ? '' : currentValue)
										setOpen(false)
									}}
								>
									{option.label}
									<Check
										className={cn(
											'ml-auto',
											value === option.value ? 'opacity-100' : 'opacity-0',
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default Combobox
