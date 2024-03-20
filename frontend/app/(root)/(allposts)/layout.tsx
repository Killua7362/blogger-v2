'use client'
import { useRouter } from 'next/navigation';
import { Fragment } from 'react'
import { RiArrowLeftSLine } from "react-icons/ri";

const PostsLayout = (
	{ children }: { children: React.ReactNode }
) => {
	const router = useRouter()
	return (
		<Fragment>
			<div className='mt-2 text-white flex gap-x-2 items-center text-base mb-4 cursor-pointer' onClick={() => {
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
