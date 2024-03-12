'use client'
import { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useRecoilState } from 'recoil'
import { contextMenuState, modalStateData, allPosts, redisCommits } from '@/atoms/states'
import MDEditor from '@uiw/react-md-editor';

const EditPost = () => {
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)
	const [previewButton, setPreviewButton] = useState<previewButton>({
		title: "Preview",
		value: "edit"
	})
	const [content, setContent] = useState<string>()

	const [redisCommitsData, setRedisCommitsData] = useRecoilState(redisCommits)
	const [allPostsData, setAllPostsData] = useRecoilState(allPosts)
	const [isContextMenuOpen, setIsContextMenuOpen] = useRecoilState(contextMenuState)
	const [contentData, setContentData] = useState<Post>()

	const [isRender, setIsRender] = useState(false)

	useEffect(() => {
		setContent(allPostsData[isContextMenuOpen.id]?.content! || "")
		setContentData(allPostsData[isContextMenuOpen.id])
		setIsRender(true)
	}, [])

	return isRender && (
		<div className="p-6 w-full sm:w-10/12 xl:w-7/12 h-[43rem] border-primary/40 border-[0.1px] rounded-xl flex flex-col bg-background flex flex-col justify-between items-end" onClick={(e) => {
			e.stopPropagation()
		}}>
			<div className='w-full flex justify-between items-center'>
				<div className='text-xl'>
					{contentData?.title}
				</div>
				<span className="text-lg cursor-pointer hover:text-white/70" onClick={() => {
					setIsModalOpen({
						open: false,
						title: ""
					})
				}}>
					<RxCross2 />
				</span>
			</div>
			<MDEditor
				value={content}
				onChange={setContent}
				preview={previewButton.value}
				height={"85%"}
				className='w-full'
			/>
			<div className="flex gap-x-4">
				<div className="px-3 py-2 w-fit border-white bg-white text-background rounded-md text-md mt-2 cursor-pointer hover:bg-white/90 hover:text-background/90"
					onClick={() => {
						previewButton.value === 'edit' ? setPreviewButton({ title: "Edit", value: "preview" }) : setPreviewButton({ title: "Preview", value: "edit" })
					}}>
					{previewButton.title}
				</div>
				<div className="px-3 py-2 w-fit border-white bg-white text-background rounded-md text-md mt-2 cursor-pointer hover:bg-white/90 hover:text-background/90" onClick={() => {
					setRedisCommitsData(prev => {
						return {
							...prev,
							[isContextMenuOpen.id]: {
								original: { ...(prev[isContextMenuOpen.id]?.original || allPostsData[isContextMenuOpen.id]) },
								history: [
									...(prev[isContextMenuOpen.id]?.history || []),
									{
										action: "edit_post",
										payload: {
											...allPostsData[isContextMenuOpen.id],
											content: content
										}
									}
								]
							}
						}
					})
					setIsModalOpen({ open: false, title: "" })
				}}>
					Modify
				</div>
			</div>
		</div >
	)
}
export default EditPost
