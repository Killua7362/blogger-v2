'use client'
import { Fragment, useState } from 'react'
import PostsContainer from '@/ui/components/posts/postsContainer'
import { FcSearch } from "react-icons/fc";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

const AllPosts = () => {
	const [filterConfig, setFilterConfig] = useState<filterConfig>({
		isPinned: false,
		reverse: false,
		sortType: "modified date"
	})

	const [sortActive, setSortActive] = useState(false)
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
				<div className='flex gap-x-2 w-full items-center'>
					<div className='p-1 bg-background hover:bg-[#333333]/30 px-3 py-1 rounded-xl border-primary/30 border-[0.1px] cursor-pointer'>
						Filter
					</div>
					<div className={`flex gap-x-2  items-center p-1  px-3 py-1 rounded-xl border-primary/30 border-[0.1px] cursor-pointer divide-x-[0.1px] divide-white/30 hover:bg-[#333333]/30 ${sortActive ? "bg-[#333333]/30" : "bg-background"}`} onClick={() => {
						sortActive === false ? setSortActive(true) : setSortActive(false)
					}}>
						<div>
							Sort
						</div>
					</div>
					{
						sortActive && <select className='py-1 px-2 bg-background text-white border-white/30 border-[0.1px] rounded-xl'
							value={filterConfig?.sortType || "modified date"} onChange={(e) => {
								setFilterConfig(prev => {
									return {
										...prev,
										sortType: (e.target.value || "modified date")
									}
								})
							}}>
							<option value="name">Name</option>
							<option value="created date">Created Date</option>
							<option value="modified date">Modified Date</option>
							<option value="word count">Word Count</option>
						</select>

					}
					<div className='pt-1 text-lg cursor-pointer' onClick={() => {
						filterConfig?.reverse === true ? setFilterConfig(prev => {
							return {
								...prev,
								reverse: false
							}
						})
							: setFilterConfig(prev => {
								return {
									...prev,
									reverse: true
								}

							})
					}}>
						{(filterConfig?.reverse === true) ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
					</div>
				</div>
			</div>
			<PostsContainer filterConfig={filterConfig} />
		</Fragment >
	)
}
export default AllPosts
