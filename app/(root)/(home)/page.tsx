import { Fragment } from 'react'
import Image from 'next/image'
import Linx from '@/ui/layout/linkx'
import { FcLink } from "react-icons/fc";
import { MdKeyboardArrowRight } from "react-icons/md";
import PostsContainer from '@/ui/components/posts/postsContainer'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const BasePage = () => {
	return (
		<Fragment>
			<div>
				<div className='flex md:flex-row flex-col-reverse p-4 py-2 w-full justify-between items-center gap-y-2'>
					<div className="flex flex-col gap-y-2 md:w-8/12 w-full">
						<div className='text-xl tracking-wider flex gap-x-2 items-center'>
							<span className='text-3xl'>
								Black Grimore
							</span>
							<div className='text-base text-primary cursor-pointer'>
								<FaArrowUpRightFromSquare />
							</div>
						</div>
						<div className='text-lg text-justify sm:tracking-wide'>
							Black Grimore is my personal digital garden. Where I share and save my knowledge. It would allow me to access my notes or guides
							anywhere and anytime.
						</div>
						<Linx />
					</div>
					<div className="flex flex-col items-center justify-center gap-y-2">
						<Image unoptimized src="/images/grimoire.webp" width={0} height={0} className='h-full w-full md:h-[150px] md:w-[200px] ' />
						<span className="text-sm">
							Reference: Black Clover
						</span>
					</div>
				</div>
				<PostsContainer filterConfig={{
					headingName: "Featured",
					postsCount: 5
				}} />
				<PostsContainer filterConfig={{
					headingName: "Recent",
					postsCount: 5
				}} />
				<div className="w-full flex justify-center items-center hover:gap-x-2 cursor-pointer text-lg uppercase">
					<div>
						All Posts
					</div>
					<MdKeyboardArrowRight />
				</div>
			</div>
		</Fragment>
	)
}

export default BasePage

//title
//descriptoin
//date
//word count
//tags
