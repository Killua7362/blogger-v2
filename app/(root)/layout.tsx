import NavBar from "../components/navbar"
import { Fragment } from 'react'
import Footer from '@/app/components/footer'

const BaseLayout = (
	{ children }: { children: React.ReactNode }
) => {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-between">
			<NavBar />
			<div className="pt-28 w-6/12">
				{children}
			</div>
			<Footer />
		</div>
	)
}
export default BaseLayout
