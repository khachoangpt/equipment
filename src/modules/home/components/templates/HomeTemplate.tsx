import { pageList } from '@/configs/routes'
import { BriefcaseBusiness, User, Wrench } from 'lucide-react'
import FeatureCard from '../molecules/FeatureCard'

const HomeTemplate = () => {
	const homeData = [
		{
			label: 'Trang bị đồng bộ',
			icon: (
				<BriefcaseBusiness className="absolute h-40 w-40 translate-y-10 translate-x-20 opacity-15" />
			),
			href: pageList.equipmentSet.href,
		},
		{
			label: 'Trang bị lắp ghép',
			icon: (
				<Wrench className="absolute h-40 w-40 translate-y-10 translate-x-20 opacity-15" />
			),
			href: pageList.assembledEquipment.href,
		},
		{
			label: 'Tài khoản',
			icon: (
				<User className="absolute h-40 w-40 translate-y-10 translate-x-20 opacity-15" />
			),
			href: pageList.account.href,
		},
	]

	return (
		<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
			{homeData.map((item) => (
				<FeatureCard key={item.label} item={item} />
			))}
		</div>
	)
}

export default HomeTemplate
