
import { Fragment } from 'react'
import PostsContainer from '@/components/postsContainer'

const AllPosts = () => {
	return (
		<Fragment>
			<div className='md:px-8 py-0 p-5 flex flex-col gap-y-4 items-center'>
				<input className='w-11/12 text-xl rounded-xl bg-background text-white border-white/70 h-0 p-6 my-2 border-[0.1px]' placeholder='Search posts...' />
				<div className='flex gap-x-2 w-full'>
					<div className='p-1 bg-[#333333] px-3 py-1 rounded-xl border-white/30 border-[0.1px]'>
						Sort
					</div>
					<div className='p-1 bg-[#333333] px-3 py-1 rounded-xl border-white/30 border-[0.1px]'>
						Filter
					</div>
				</div>
			</div>
			<PostsContainer filterConfig={{
				postsCount: 5
			}} />
		</Fragment>
	)
}
export default AllPosts
