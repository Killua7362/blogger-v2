'use client'
import { Fragment, useState } from 'react'
import ContextMenu from '@/components/contextmenu'

import { useRecoilState } from 'recoil'
import { contextMenuState } from '@/atoms/states'

const PostsContainer = ({ filterConfig }: { filterConfig: any }) => {
	const [contextMenuMetaData, setContextMenuMetaData] = useRecoilState(contextMenuState)

	return (
		<Fragment>
			{contextMenuMetaData.open && <ContextMenu />}
			{
				filterConfig.headingName &&
				<div className="text-2xl uppercase border-b-[0.1px] h-4 border-white/30 my-4">
					<span className='w-fit bg-background pr-6'>
						{filterConfig.headingName}
					</span>
				</div>

			}
			<div className="flex flex-col p-2">
				{
					new Array(filterConfig.postsCount).fill(0).map((_, i) => {
						return (
							<div className='flex flex-col gap-y-1 border-white/30 rounded-xl md:p-6 md:py-4 p-3' onContextMenu={(e) => {
								e.preventDefault()
								e.stopPropagation()
								setContextMenuMetaData({
									open: true,
									points: [e.pageX, e.pageY]
								})
							}}>
								<div className='flex w-full justify-between'>
									<div className='text-2xl tracking-wider uppercase'>
										Post title
									</div>
									<div className='text-lg'>
										today
									</div>
								</div>
								<div className='flex gap-x-2'>
									<div className='text-xs bg-secondary p-1 rounded-xl px-3'>
										ML
									</div>
									<div className='text-xs bg-secondary p-1 rounded-xl px-3'>
										WEB DEV
									</div>
								</div>
								<div className='text-lg text-justify text-white/80 font-light sm:tracking-wide'>
									This is the description of this post and it states that this post is really really good.
								</div>
								<div className='text-white/80 font-light'>
									word count: 300
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
