import HandoverViewTemplate from '@/modules/equipment-set-handover-detail/components/templates/HandOverViewTemplate'
import type { PageProps } from '@/types'

const HandOverDetailPage = async ({ params }: PageProps<{ id: string }>) => {
	const { id } = await params

	return <HandoverViewTemplate id={id} />
}
export default HandOverDetailPage
