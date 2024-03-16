'use client'
import { RxCross2 } from "react-icons/rx";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { modalStateData, allPosts, redisCommits, redisSelector } from '@/atoms/states'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

const NewPostModal = () => {
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)

	const redisCommitsData = useRecoilValue(redisCommits)
	const setRedisCommitsData = useSetRecoilState(redisSelector)

	const [allPostsData, setAllPostsData] = useRecoilState(allPosts)

	const NewPostSchema = z.object({
		title: z.string().min(1).max(30),
		description: z.string().min(10).max(100),
		tags: z.string().max(50)
	})

	type NewPostSchemaType = z.infer<typeof NewPostSchema>

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<NewPostSchemaType>({ resolver: zodResolver(NewPostSchema) })


	return (
		<div className="p-6 w-[24rem] border-primary/40 border-[0.1px] rounded-xl flex flex-col bg-background " onClick={(e) => {
			e.stopPropagation()
		}}>
			<div className="text-base font-semibold tracking-wide gap-y-1 flex flex-col relative">
				<div className="flex justify-between">
					CREATE
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
					Create new post by giving name,description and comma seperated tags and click on Create.
				</div>
			</div>
			<form className="mt-3 flex flex-col items-end font-thin" onSubmit={handleSubmit((data) => {
				let newId = uuidv4()
				let dataPayload = {
					[newId]: {
						title: data.title,
						description: data.description,
						content: "Empty Post",
						pinned: false,
						tags: data.tags,
						createOn: "today",
						updatedOn: "yesterday"
					}
				}
				
				let payload = {
					[newId]: {
						original: { ...dataPayload[newId] },
						history: [
							{
								action: "new_post",
								payload: {
									...dataPayload[newId]
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
						<input type="text" className="w-full text-base bg-background text-text box-border focus-within:outline-none "
							{...register("title")} />
						{errors.title && <legend className="text-xs">{errors.title.message}</legend>}
					</fieldset>
				</div>
				<div className="py-2 flex items-center justify-end text-md gap-x-4 w-full">
					<div>
						Description
					</div>
					<fieldset className={`w-8/12  border-[0.1px] rounded-md ${errors.description ? "border-red-500 focus-within:border-red-300" : " focus-within:border-primary/80  border-primary/40"}`}>
						<input type="text" className="w-full text-base bg-background text-text box-border focus-within:outline-none "
							{...register("description")} />
						{errors.description && <legend className="text-xs">{errors.description.message}</legend>}
					</fieldset>
				</div>
				<div className="py-2 flex items-center justify-end text-md gap-x-4 w-full">
					<div>
						Tags
					</div>
					<fieldset className={`w-8/12  border-[0.1px] rounded-md ${errors.tags ? "border-red-500 focus-within:border-red-300" : " focus-within:border-primary/80  border-primary/40"}`}>
						<input type="text" className="w-full text-base bg-background text-text box-border focus-within:outline-none "
							{...register("tags")} />
						{errors.tags && <legend className="text-xs">{errors.tags.message}</legend>}
					</fieldset>
				</div>
				<button type="submit" className="px-3 py-2 w-fit border-white bg-white text-background rounded-md text-md mt-2 cursor-pointer hover:bg-white/90 hover:text-background/90 font-normal">
					Create
				</button>
			</form>
		</div >
	)
}
export default NewPostModal
