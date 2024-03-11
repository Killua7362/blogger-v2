'use client'

import { Fragment, useEffect, useState } from 'react'
import '@/styles/markdown-styles.css'
import { useSearchParams, redirect } from 'next/navigation'

import { MarkdownComponents } from '@/ui/components/posts/markdown-components'

import * as matter from 'gray-matter'

import Markdown from 'react-markdown'

import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'
import { notFound } from 'next/navigation'

import { useRecoilState } from 'recoil'
import { allPosts, contextMenuState } from '@/atoms/states'

const Post = () => {
	const [isRender, setIsRender] = useState(false)
	const searchParams = useSearchParams()
	const [allPostsData, setAllPostsData] = useRecoilState(allPosts)
	const [content, setContent] = useState({})
	const [isContextOpen, setIsContextOpen] = useRecoilState(contextMenuState)

	useEffect(() => {
		let postId = searchParams.get('id')
		if (!(postId in allPostsData)) {
			redirect('/')
			notFound()
		}
		setIsContextOpen(prev => {
			return {
				...prev,
				id: postId
			}
		})
		setIsRender(true)
	}, [])

	useEffect(() => {
		let postId = searchParams.get('id')
		if (Object.keys(allPostsData[postId]).length === 0) {
			setIsRender(false)
			redirect('/')
		}
		setContent(allPostsData[postId])
	}, [allPostsData])

	return isRender && (
		<Fragment>
			<div className='md:px-8 px-2 mt-4 md:mt-8 flex flex-col md:gap-y-2 gap-y-3'>
				<div className='text-2xl text-justify tracking-wide'>
					{content.title}
				</div>
				<div className='text-base font-thin'>
					{content.description}
				</div>
				<div className='flex justify-between'>
					<div className='text-base font-thin'>
						{content.updatedOn}
					</div>
					<div className='flex gap-x-2'>
						{content.tags.split(',').map((e, _) => {
							return (
								<div className='text-xs bg-secondary p-1 rounded-xl px-3'>
									{e}
								</div>
							)
						})}
					</div>
				</div>
				<div className='text-base text-justify text-white/80 markdown-class'>
					<Markdown
						components={{ ...MarkdownComponents }}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeFormat, rehypeSanitize]}
						unwrapDisallowed
					>{content.content}</Markdown>
				</div>
			</div>
		</Fragment >
	)
}

export default Post
