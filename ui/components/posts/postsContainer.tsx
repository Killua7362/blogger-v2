'use client'
import { Fragment, useEffect, useState } from 'react'
import ContextMenu from '@/ui/components/posts/contextmenu'

import { useRecoilState } from 'recoil'
import { contextMenuState, navbarMenuState, signInState, allPosts } from '@/atoms/states'
import Link from 'next/link'

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

const sortFunction = (data: Entries<allPosts>, filterConfig: filterConfig) => {
	if (filterConfig?.sortType === "created date") {
		data = data.sort((a, b) => {
			return new Date(a[1]?.createdOn) - new Date(b[1]?.createdOn)
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
			return new Date(a[1]?.updatedOn) - new Date(b[1]?.updatedOn)
		})
	}

	if (filterConfig?.reverse) {
		return data.reverse();
	}
	return data;
}

const PostsContainer = ({ filterConfig }: { filterConfig: filterConfig }) => {
	const [contextMenuMetaData, setContextMenuMetaData] = useRecoilState(contextMenuState)
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	const [isSignIn, setIsSignIn] = useRecoilState(signInState)
	const [allPostsData, setAllPostsData] = useRecoilState(allPosts)

	return (
		<Fragment>
			{contextMenuMetaData.open && <ContextMenu />}
			{
				filterConfig.headingName &&
				<div className="text-2xl uppercase border-b-[0.1px] h-4 border-primary/40 my-4 tracking-wide font-medium">
					<span className='w-fit bg-background pr-6'>
						{filterConfig.headingName}
					</span>
				</div>

			}
			<div className="flex flex-col p-2">
				{
					sortFunction(Object.entries(customFilter(allPostsData, filterConfig)).slice(0, filterConfig.postsCount || Object.keys(allPostsData).length), filterConfig).map(entry => entry[0]).map((id, idx) => {
						return (allPostsData[id].title) && (
							<Link href={{ pathname: "/post", query: { id: id } }} className='text-white no-underline' key={`postContainer+${id}+${idx}`}>
								<div className='flex flex-col gap-y-1 border-white/30 rounded-xl md:p-6 md:py-4 p-3' onContextMenu={(e) => {
									if (isSignIn) {
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
									<div className='flex w-full justify-between'>
										<div className='text-2xl tracking-wide uppercase'>
											{allPostsData[id].title}
										</div>
										<div className='text-lg font-thin'>
											{allPostsData[id].updatedOn}
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
								</div>
							</Link>
						)
					})
				}
			</div>
		</Fragment >
	)
}

export default PostsContainer
