import { Fragment } from 'react'
import NavBar from '@/app/components/navbar'
import { RiArrowLeftSLine } from "react-icons/ri";
import Footer from '@/app/components/footer'

const PostLayout = (
	{ children }: { children: React.ReactNode }
) => {
	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-between">
			<NavBar />
			<div className="pt-28 2xl:w-6/12 xl:w-7/12 lg:w-8/12 w-10/12">
				<div className='text-white flex gap-x-2 items-center text-base mb-4'>
					<RiArrowLeftSLine />
					Go Back
				</div>
				{children}
			</div>
			<Footer />
		</div>
	)
}
export default PostLayout
