'use client'
import { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useRecoilState } from 'recoil'
import { modalStateData } from '@/atoms/states'

import CommitDiv from '@/ui/components/home/modals/Commit/CommitDiv'

const CommitModal = () => {
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)

	return (
		<div className="p-6 overflow-hidden w-full sm:w-10/12 xl:w-7/12 h-[40rem] border-primary/40 border-[0.1px] rounded-xl flex flex-col bg-background flex flex-col justify-between items-end" onClick={(e) => {
			e.stopPropagation()
		}}>
			<div className="text-base font-semibold tracking-wide gap-y-1 flex flex-col relative w-full">
				<div className="flex justify-between text-xl">
					<div className='flex flex-col'>
						Version Control
						<span className='text-sm font-thin text-text/70'>
							Click on push for final action.
						</span>
					</div>
					<span className=" text-lg cursor-pointer hover:text-white/70" onClick={() => {
						setIsModalOpen({
							open: false,
							title: ""
						})
					}}>
						<RxCross2 />
					</span>
				</div>
			</div>
			<div className='w-full h-[80%]'>
				<CommitDiv />
			</div>
			<div className='flex justify-between w-full'>
				<div className="flex gap-x-4">
					<div className="px-3 py-2 w-fit border-white bg-white text-background rounded-md text-md mt-2 cursor-pointer hover:bg-white/90 hover:text-background/90">
						Unstage
					</div>
					<div className="px-3 py-2 w-fit border-white bg-white text-background rounded-md text-md mt-2 cursor-pointer hover:bg-white/90 hover:text-background/90" onClick={() => {
						setIsModalOpen({ open: false, title: "" })
					}}>
						Commit
					</div>
				</div>
				<div className="flex gap-x-4">
					<div className="px-3 py-2 w-fit border-white bg-white text-background rounded-md text-md mt-2 cursor-pointer hover:bg-white/90 hover:text-background/90" onClick={() => {
						setIsModalOpen({ open: false, title: "" })
					}}>
						Cancel
					</div>
					<div className="px-3 py-2 w-fit border-white bg-white text-background rounded-md text-md mt-2 cursor-pointer hover:bg-white/90 hover:text-background/90" onClick={() => {
						setIsModalOpen({ open: false, title: "" })
					}}>
						Confirm
					</div>
				</div>
			</div>
		</div >
	)
}
export default CommitModal 
