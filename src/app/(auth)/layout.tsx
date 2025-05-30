import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren

const AuthLayout = ({ children }: Props) => {
	return <>{children}</>
}

export default AuthLayout
