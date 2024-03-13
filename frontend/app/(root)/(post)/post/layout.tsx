'use client'
import { Fragment } from 'react'
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from 'next/navigation'

const PostsLayout = (
	{ children }: { children: React.ReactNode }
) => {
	const router = useRouter()
	return (
		<Fragment>
			<div className='text-white flex gap-x-2 items-center text-base mb-4 cursor-pointer' onClick={() => {
				router.back()
			}}>
				<RiArrowLeftSLine />
				Go Back
			</div>
			{children}
		</Fragment>
	)
}
export default PostsLayout
