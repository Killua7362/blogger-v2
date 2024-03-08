'use client'
import { RxCross2 } from "react-icons/rx";
import { useRecoilState } from 'recoil'
import { modalStateData } from '@/atoms/states'

const EditMetaData = () => {
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)

	return (
		<div className="p-6 w-[20rem] border-primary/40 border-[0.1px] rounded-xl flex flex-col bg-background" onClick={(e) => {
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
					Modify post name and tags then click on save.
				</div>
			</div>
			<div className="mt-3 flex flex-col items-end">
				<div className="py-2 flex items-center justify-end text-md gap-x-4 w-full">
					<div>
						Title
					</div>
					<input type="text" className="py-2 w-9/12 rounded-md px-4 text-md bg-background text-text box-border focus-within:outline-none focus-within:border-primary/80  border-primary/40 border-[0.1px] " />
				</div>

				<div className="py-2 flex items-center justify-end text-md gap-x-4 w-full">
					<div>
						Tags
					</div>
					<input type="text" className="py-2 w-9/12 rounded-md px-4 text-md bg-background text-text box-border focus-within:outline-none focus-within:border-primary/80  border-primary/40 border-[0.1px] " />
				</div>
				<div className="px-3 py-2 w-fit border-white bg-white text-background rounded-md text-md mt-2 cursor-pointer hover:bg-white/90 hover:text-background/90">
					Modify
				</div>
			</div>
		</div >
	)
}
export default EditMetaData 
