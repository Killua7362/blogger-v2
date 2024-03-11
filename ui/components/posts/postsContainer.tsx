'use client'
import { Fragment, useEffect, useState } from 'react'
import ContextMenu from '@/ui/components/posts/contextmenu'

import { useRecoilState } from 'recoil'
import { contextMenuState, navbarMenuState, signInState, allPosts } from '@/atoms/states'

const customFilter = (data, filterConfig) => {
	let result = {}
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

const PostsContainer = ({ filterConfig }: { filterConfig: any }) => {
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
					Object.entries(customFilter(allPostsData, filterConfig)).slice(0, filterConfig.postCount || allPostsData.length).map(entry => entry[0]).map((id, _) => {
						return (allPostsData[id].title) && (
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
										(allPostsData[id].tags.split(',')).map((e, _) => {
											return e.length !== 0 ? (
												<div className='text-xs bg-secondary p-1 rounded-xl px-3'>
													{e}
												</div>

											) : (
												<div className='text-xs bg-secondary p-1 rounded-xl px-3'>
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
									word count: {allPostsData[id].content.length}
								</div>
							</div>
						)
					})
				}
			</div>
		</Fragment >
	)
}

export default PostsContainer
