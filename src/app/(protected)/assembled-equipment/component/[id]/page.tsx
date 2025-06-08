import ComponentDetailTemplate from '@/modules/component-set-detail/components/templates/ComponentDetailTemplate'
import type { PageProps } from '@/types'

const DetailComponentPage = async (props: PageProps<{ id: string }>) => {
	const params = await props.params

	return <ComponentDetailTemplate id={params.id} />
}
export default DetailComponentPage
