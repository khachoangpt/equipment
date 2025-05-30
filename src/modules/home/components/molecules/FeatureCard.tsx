import { Card } from '@/components/ui/card'
import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
	item: {
		label: string
		icon: ReactNode
		href: string
	}
}

const FeatureCard = ({ item }: Props) => {
	return (
		<Link href={item.href}>
			<Card className="relative cursor-pointer overflow-hidden flex items-center justify-center h-40 bg-gradient-to-br from-teal-700 to-teal-200 hover:to-white">
				<span className="absolute top-3 text-white left-3 text-xl font-extrabold capitalize">
					{item.label}
				</span>
				{item.icon}
			</Card>
		</Link>
	)
}

export default FeatureCard
