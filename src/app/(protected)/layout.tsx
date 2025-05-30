import MainLayout from '@/modules/layout/organisms/MainLayout'
import type { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const ProtectedLayout = ({ children }: Props) => {
	return <MainLayout>{children}</MainLayout>
}

export default ProtectedLayout
