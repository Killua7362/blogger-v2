'use client'

import { Fragment, useEffect, useState } from 'react'
import Comments from '@/components/comments'
import '@/styles/markdown-styles.css'
import { story } from './data.js'

import { MarkdownComponents } from '@/components/markdown-components'

import * as matter from 'gray-matter'

import Markdown from 'react-markdown'

import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'

import MDEditor from '@uiw/react-md-editor';

const Post = () => {
	return (
		<Fragment>
			<div className='md:px-8 py-0 p-5 flex flex-col gap-y-2 text-2xl'>
				<div>
					Adverse affect of using linux instead of windows in long term
				</div>
				<div className='flex justify-between'>
					<div className='text-base'>
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
					<MDEditor />
				</div>
				<Comments />
			</div>
		</Fragment >
	)
}

export default Post
