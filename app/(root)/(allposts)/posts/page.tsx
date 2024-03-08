import { Fragment } from 'react'
import PostsContainer from '@/ui/components/posts/postsContainer'
import { FcSearch } from "react-icons/fc";

const AllPosts = () => {
	return (
		<Fragment>
			<div className='md:px-8 py-0 p-5 flex flex-col gap-y-4 items-center'>
				<div className='text-2xl font-medium tracking-wide'>
					All Posts
				</div>
				<div className='w-full flex items-center justify-around rounded-xl border-primary/40 border-[0.1px] focus-within:border-primary/80 p-2 my-2'>
					<span className='relative text-xl mt-2 ml-2'>
						<FcSearch />
					</span>
					<input className='w-11/12 text-xl bg-background text-white p-4 h-0 outline-none focus-within:outline-none' placeholder='Search posts...' />
				</div>
				<div className='flex gap-x-2 w-full'>
					<div className='p-1 bg-background hover:bg-[#333333]/30 px-3 py-1 rounded-xl border-primary/30 border-[0.1px] cursor-pointer'>
						Sort
					</div>
					<div className='p-1 bg-background hover:bg-[#333333]/30 px-3 py-1 rounded-xl border-primary/30 border-[0.1px] cursor-pointer'>
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
