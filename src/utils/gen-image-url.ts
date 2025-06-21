export const genImageUrl = (link?: string, fallback = '') => {
	if (!link) {
		return fallback
	}
	if (
		link.startsWith('blob') ||
		link.startsWith('http://') ||
		link.startsWith('https://')
	) {
		return link
	}
	return `${process.env.NEXT_PUBLIC_API_URL}${
		link.startsWith('/') ? '' : '/'
	}${link}`
}
