'use client'
import { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useRecoilState } from 'recoil'
import { modalStateData } from '@/atoms/states'

import MDEditor from '@uiw/react-md-editor';

const EditPost = () => {
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)
	const [previewButton, setPreviewButton] = useState({
		title: "Preview",
		value: "edit"
	})
	const [content, setContent] = useState("")

	return (
		<div className="p-6 w-full sm:w-10/12 xl:w-7/12 h-[40rem] border-primary/40 border-[0.1px] rounded-xl flex flex-col bg-background flex flex-col justify-between items-end" onClick={(e) => {
			e.stopPropagation()
		}}>
			<MDEditor
				value={content}
				onChange={setContent}
				preview={previewButton.value}
				height={"90%"}
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
					setIsModalOpen({ open: false, title: "" })
				}}>
					Modify
				</div>
			</div>
		</div >
	)
}
export default EditPost
