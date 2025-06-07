import HandoverDetailTemplate from '@/modules/equipment-set-handover-detail/components/templates/HandOverCreateTemplate'
import type { PageProps } from '@/types'

const HandOverDetailPage = async ({ params }: PageProps<{ id: string }>) => {
	const { id } = await params

	return <HandoverDetailTemplate id={id} />
}
export default HandOverDetailPage
