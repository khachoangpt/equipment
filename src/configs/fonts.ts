import { Roboto } from 'next/font/google'

const RobotoFont = Roboto({
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	preload: true,
})

export { RobotoFont }
