import { Fragment } from 'react'
import { RiArrowLeftSLine } from "react-icons/ri";

const PostsLayout = (
	{ children }: { children: React.ReactNode }
) => {
	return (
		<Fragment>
			<div className='text-white flex gap-x-2 items-center text-base mb-4'>
				<RiArrowLeftSLine />
				Go Back
			</div>
			{children}
		</Fragment>
	)
}
export default PostsLayout
