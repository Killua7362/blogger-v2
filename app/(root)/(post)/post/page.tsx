'use client'

import { Fragment } from 'react'
import '@/styles/markdown-styles.css'
import { useSearchParams } from 'next/navigation'

import { story } from './data.js'

import { MarkdownComponents } from '@/ui/components/posts/markdown-components'

import * as matter from 'gray-matter'

import Markdown from 'react-markdown'

import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'


const Post = () => {
	const searchParams = useSearchParams()
	// console.log(searchParams.get('id'))
	return (
		<Fragment>
			<div className='md:px-8 px-2 mt-4 md:mt-8 flex flex-col md:gap-y-2 gap-y-3'>
				<div className='text-2xl text-justify tracking-wide'>
					Adverse affect of using linux instead of windows in long term
				</div>
				<div className='flex justify-between'>
					<div className='text-base font-thin'>
						Today
					</div>
					<div className='flex gap-x-2'>
						<div className='text-xs bg-secondary p-1 rounded-xl px-3'>
							ML
						</div>
						<div className='text-xs bg-secondary p-1 rounded-xl px-3'>
							WEB DEV
						</div>
					</div>
				</div>
				<div className='text-base text-justify text-white/80 markdown-class'>
					<Markdown
						components={{ ...MarkdownComponents }}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeFormat, rehypeSanitize]}
						unwrapDisallowed
					>{story}</Markdown>
				</div>
			</div>
		</Fragment >
	)
}

export default Post
