import type { ReactNode } from 'react'

type PageProps<Params = {}, SearchParams = {}> = {
	params: Promise<Params>
	searchParams: Promise<SearchParams>
}

type SidebarItem = {
	id: string
	label: string
	href: string
	icon: ReactNode
	items: {
		id: string
		label: string
		href: string
	}[]
}

export type { PageProps, SidebarItem }
