'use client'
import { RxCross2 } from "react-icons/rx";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { redisCommits, allPosts, modalStateData, contextMenuState, redisSelector } from '@/atoms/states'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

const EditMetaData = () => {
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)
	const [isContextMenuOpen, setIsContextMenuOpen] = useRecoilState(contextMenuState)
	const allPostsData = useRecoilValue(allPosts)

	const redisCommitsData = useRecoilValue(redisCommits)
	const setRedisCommitsData = useSetRecoilState(redisSelector)

	const EditPostMetaDataSchema = z.object({
		title: z.string().min(1).max(30),
		description: z.string().min(10).max(100),
		tags: z.string().max(50)
	})

	type EditPostMetaDataSchemaType = z.infer<typeof EditPostMetaDataSchema>

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<EditPostMetaDataSchemaType>({ resolver: zodResolver(EditPostMetaDataSchema) })

	return (
		<div className="p-6 w-[24rem] border-primary/40 border-[0.1px] rounded-xl flex flex-col bg-background " onClick={(e) => {
			e.stopPropagation()
		}}>
			<div className="text-base font-semibold tracking-wide gap-y-1 flex flex-col relative">
				<div className="flex justify-between">
					Edit Metadata
					<span className="absolute right-[-12px] top-[-12px] text-base cursor-pointer hover:text-white/70" onClick={() => {
						setIsModalOpen({
							open: false,
							title: ""
						})
					}}>
						<RxCross2 />
					</span>
				</div>
				<div className="text-xs text-text/70 font-normal">
					Edit post metadata by modifying name,description and comma seperated tags and click on Modify.
				</div>
			</div>
			<form className="mt-3 flex flex-col items-end font-thin" onSubmit={handleSubmit((data) => {
				let payload:redisCommits = {
						[isContextMenuOpen.id]: {
							original: { ...(redisCommitsData[isContextMenuOpen.id]?.original || allPostsData[isContextMenuOpen.id]) },
							history: [
								{
									action: "edit_metadata",
									payload: {
										...allPostsData[isContextMenuOpen.id],
										...data
									}
								}
							]
						}
				}
				setRedisCommitsData(payload)

				setIsModalOpen({ open: false, title: "" })
			})}>
				<div className="py-2 flex items-center justify-end text-md gap-x-4 w-full">
					<div>
						Title
					</div>
					<fieldset className={`w-8/12  border-[0.1px] rounded-md ${errors.title ? "border-red-500 focus-within:border-red-300" : " focus-within:border-primary/80  border-primary/40"}`}>
						<input type="text" defaultValue={allPostsData[isContextMenuOpen.id].title} className="w-full text-base bg-background text-text box-border focus-within:outline-none "
							{...register("title")} />
						{errors.title && <legend className="text-xs">{errors.title.message}</legend>}
					</fieldset>
				</div>
				<div className="py-2 flex items-center justify-end text-md gap-x-4 w-full">
					<div>
						Description
					</div>
					<fieldset className={`w-8/12  border-[0.1px] rounded-md ${errors.description ? "border-red-500 focus-within:border-red-300" : " focus-within:border-primary/80  border-primary/40"}`}>
						<input type="text" defaultValue={allPostsData[isContextMenuOpen.id].description} className="w-full text-base bg-background text-text box-border focus-within:outline-none "
							{...register("description")} />
						{errors.description && <legend className="text-xs">{errors.description.message}</legend>}
					</fieldset>
				</div>
				<div className="py-2 flex items-center justify-end text-md gap-x-4 w-full">
					<div>
						Tags
					</div>
					<fieldset className={`w-8/12  border-[0.1px] rounded-md ${errors.tags ? "border-red-500 focus-within:border-red-300" : " focus-within:border-primary/80  border-primary/40"}`}>
						<input type="text" defaultValue={allPostsData[isContextMenuOpen.id].tags} className="w-full text-base bg-background text-text box-border focus-within:outline-none "
							{...register("tags")} />
						{errors.tags && <legend className="text-xs">{errors.tags.message}</legend>}
					</fieldset>
				</div>
				<button type="submit" className="px-3 py-2 w-fit border-white bg-white text-background rounded-md text-md mt-2 cursor-pointer hover:bg-white/90 hover:text-background/90 font-normal">
					Modify
				</button>
			</form>
		</div >
	)
}
export default EditMetaData 
