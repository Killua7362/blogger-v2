'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import Linx from '@/ui/layout/linkx'
import { FcLink } from "react-icons/fc";
import { MdKeyboardArrowRight } from "react-icons/md";
import PostsContainer from '@/ui/components/posts/postsContainer'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from 'next/link'
import { motion } from 'framer-motion'

const BasePage = () => {
	return (
		<Fragment>
			<div>
				<div className='flex md:flex-row flex-col-reverse py-4 w-full justify-between items-center gap-y-6'>
					<div className="flex flex-col gap-y-2 md:w-8/12 w-11/12">
						<div className='text-xl flex gap-x-2 items-center tracking-wide font-medium uppercase'>
							<span className='text-2xl'>
								Black Grimore
							</span>
							<Link href="https://github.com/Killua7362/blogger-v2" target='_blank'>
								<motion.div
									className='text-base text-primary cursor-pointer'
									whileHover={{ scale: 1.1 }}
								>
									<FaArrowUpRightFromSquare />
								</motion.div>
							</Link>
						</div>
						<div className='text-lg text-justify sm:tracking-wide font-thin'>
							Black Grimore is my personal digital garden. Where I share and save my knowledge. It would allow me to access my notes or guides
							anywhere and anytime.
						</div>
						<Linx />
					</div>
					<div className="flex flex-col items-center justify-center gap-y-2">
						<Image priority unoptimized src="/images/grimoire.webp" width={0} height={0} className='h-full w-full md:h-[150px] md:w-[200px] ' alt="Black grimoire in black clover" />
						<span className="text-sm tracking-wide">
							Reference: Black Clover
						</span>
					</div>
				</div>
				<PostsContainer filterConfig={{
					headingName: "Featured",
					postsCount: 5,
					isPinned: true,
					sortType: "modified date"
				}} />
				<PostsContainer filterConfig={{
					headingName: "Recent",
					postsCount: 5,
					isPinned: false,
					sortType: "modified date"
				}} />
				<div className="w-full flex justify-center items-center hover:gap-x-2 cursor-pointer text-lg uppercase">
					<Link href={{ pathname: "/posts" }} className='text-white no-underline'>
						<div>
							All Posts
						</div>
					</Link>
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
