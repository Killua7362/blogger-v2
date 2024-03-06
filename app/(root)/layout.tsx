import NavBar from "../components/navbar"
import { Fragment } from 'react'
import Footer from '@/app/components/footer'

const BaseLayout = (
	{ children }: { children: React.ReactNode }
) => {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-between">
			<NavBar />
			<div className="pt-28 2xl:w-6/12 xl:w-7/12 lg:w-8/12 w-10/12">
				{children}
			</div>
			<Footer />
		</div>
	)
}
export default BaseLayout
