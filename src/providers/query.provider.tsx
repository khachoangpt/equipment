'use client'

import { client } from '@/client'
import axios, { type AxiosStatic } from '@/configs/axios'
import { queryClient } from '@/configs/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export default function QueryProvider({ children }: Props) {
	client.setConfig({
		axios: axios as AxiosStatic,
		baseURL: process.env.NEXT_PUBLIC_API_URL,
		throwOnError: true,
	})

	return (
		<QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
	)
}
