type Props = {
	title: string
}

const PageTitle = ({ title = '' }: Props) => {
	return <h1 className="text-3xl text-gray-900 font-bold mb-2">{title}</h1>
}

export default PageTitle
