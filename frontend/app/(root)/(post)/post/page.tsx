'use client'

import { Fragment, useEffect, useState } from 'react'
import '@/styles/markdown-styles.css'
import { useSearchParams, redirect } from 'next/navigation'

import { MarkdownComponents } from '@/ui/components/posts/markdown-components'

import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'
import { notFound } from 'next/navigation'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { allPosts, contextMenuState } from '@/atoms/states'

import dynamic from 'next/dynamic'

const Markdown = dynamic(() => import('react-markdown'), { ssr: false })

const Post = () => {
	const [isRender, setIsRender] = useState(false)
	const searchParams = useSearchParams()
	const allPostsData = useRecoilValue(allPosts)
	const [content, setContent] = useState<Post>()
	const setIsContextOpen = useSetRecoilState(contextMenuState)

	useEffect(() => {
		let postId = (searchParams.get('id') || '-1')
		if (!(postId in allPostsData) || Object.keys(allPostsData[postId]).length === 0) {
			setIsRender(false)
			notFound()
		}
		setIsContextOpen(prev => {
			return {
				...prev,
				id: postId
			}
		})
		setContent(allPostsData[postId])
		if (!isRender) {
			setIsRender(true)
		}
	}, [allPostsData, isRender, searchParams])

	return isRender && (
		<Fragment>
			<div className='md:px-8 px-2 mt-4 md:mt-8 flex flex-col md:gap-y-2 gap-y-3'>
				<div className='text-2xl text-justify tracking-wide'>
					{content?.title}
				</div>
				<div className='text-base font-thin'>
					{content?.description}
				</div>
				<div className='flex justify-between'>
					<div className='text-base font-thin'>
						{new Date(content?.updated_at || 0).toLocaleDateString('en-US')}
					</div>
					<div className='flex gap-x-2'>
						{(content?.tags || "").split(',').map((e, i) => {
							return (
								<div className='text-xs bg-secondary p-1 rounded-xl px-3' key={`${searchParams.get('id')}+${i}`}>
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
					>{content?.content}</Markdown>
				</div>
			</div>
		</Fragment >
	)
}

export default Post
