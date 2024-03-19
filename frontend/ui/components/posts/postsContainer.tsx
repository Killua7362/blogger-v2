'use client'
import { Fragment, useState } from 'react'
import ContextMenu from '@/ui/components/posts/contextmenu'

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { contextMenuState, navbarMenuState, allPosts, userDataState } from '@/atoms/states'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

const customFilter = (data: allPosts, filterConfig: filterConfig) => {
	let result: allPosts = {}
	if (filterConfig.isPinned) {
		for (let key in data) {
			if (data[key]?.pinned) {
				result[key] = data[key]
			}
		}
		return result;
	}
	return data;
}

const sortFunction = (data: Entries<allPosts>, filterConfig: filterConfig, setPostRendered: React.Dispatch<React.SetStateAction<boolean>>, postRendered: boolean) => {
	if (filterConfig?.sortType === "created date") {
		data = data.sort((a, b) => {
			return +(new Date(a[1]?.created_at || '0')) - +new Date(b[1]?.created_at || '0')
		})
	} else if (filterConfig?.sortType === "name") {
		data = data.sort((a, b) => {
			return (a[1]?.title || "").localeCompare(b[1]?.title || "")
		})
	} else if (filterConfig?.sortType === "word count") {
		data = data.sort((a, b) => {
			return (a[1]?.content || "").length - (b[1]?.content || "").length
		})
	} else {
		data = data.sort((a, b) => {
			return +new Date(a[1]?.updated_at || '0') - +new Date(b[1]?.updated_at || '0')
		})
	}
	if (filterConfig?.searchPrefix !== "") {
		data = data.filter((entry) => (entry[1]?.title || "").includes(filterConfig?.searchPrefix || ""))
	}
	if (filterConfig?.reverse) {
		return data.reverse();
	}

	if (data.length !== 0 && !postRendered) {
		setPostRendered(true)
	}
	return data;
}

const PostsContainer = ({ filterConfig }: { filterConfig: filterConfig }) => {
	const [contextMenuMetaData, setContextMenuMetaData] = useRecoilState(contextMenuState)
	const setIsMenuOpen = useSetRecoilState(navbarMenuState)
	const allPostsData = useRecoilValue(allPosts)
	const [postRendered, setPostRendered] = useState(false)
	const userData = useRecoilValue(userDataState)

	return (
		<Fragment>
			{contextMenuMetaData.open && <ContextMenu />}
			{
				filterConfig.headingName && postRendered &&
				<div className="text-2xl uppercase border-b-[0.1px] h-4 border-primary/40 my-4 tracking-wide font-medium">
					<span className='w-fit bg-background pr-6'>
						{filterConfig.headingName}
					</span>
				</div>

			}
			<div className="flex flex-col p-2">
				{
					sortFunction(Object.entries(customFilter(allPostsData, filterConfig)).slice(0, filterConfig.postsCount || Object.keys(allPostsData).length), filterConfig, setPostRendered, postRendered).map(entry => entry[0]).map((id, idx) => {
						return (allPostsData[id].title) && (
							<Link href={{ pathname: "/post", query: { id: id } }} className='text-white no-underline' key={`postContainer+${id}+${idx}`} prefetch={true}>
								<motion.div
									className='flex flex-col gap-y-1 border-white/30 rounded-xl md:p-6 md:py-4 p-3'
									whileHover={{ scale: 1.1, margin: '14px', borderColor: '#ffffff', borderWidth: '1px' }}
									onContextMenu={(e) => {
										if (userData.logged_in && userData.role === "admin") {
											e.preventDefault()
											e.stopPropagation()
											setIsMenuOpen(false)
											setContextMenuMetaData({
												open: true,
												points: [e.pageX, e.pageY],
												id: id
											})
										}
									}}>
									<div className='flex w-full justify-between items-center'>
										<div className='text-2xl tracking-wide uppercase'>
											{allPostsData[id].title}
										</div>
										<div className='text-sm font-thin flex flex-col justify-center items-center gap-y-1 uppercase'>
											<div>
												Created: {new Date(allPostsData[id]?.created_at || 0).toLocaleDateString('en-US')}
											</div>
											<div>
												Updated: {new Date(allPostsData[id]?.updated_at || 0).toLocaleDateString('en-US')}
											</div>
										</div>
									</div>
									<div className='flex gap-x-2'>
										{
											((allPostsData[id]?.tags || "").split(',')).map((e, i) => {
												return e.length !== 0 ? (
													<div className='text-xs bg-secondary p-1 rounded-xl px-3' key={`postTags+${id}+${i}`}>
														{e}
													</div>

												) : (
													<div className='text-xs bg-secondary p-1 rounded-xl px-3' key={`postTags+${id}+${i}`}>
														No Tag
													</div>
												)
											})
										}
									</div>
									<div className='text-lg text-justify text-white/80 font-thin tracking-wide'>
										{allPostsData[id].description}
									</div>
									<div className='text-white/80 font-thin'>
										word count: {allPostsData[id]?.content?.length}
									</div>
								</motion.div>
							</Link>
						)
					})
				}
			</div>
		</Fragment >
	)
}

export default PostsContainer
