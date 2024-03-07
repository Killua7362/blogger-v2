'use client'
import { HiOutlineDotsVertical } from "react-icons/hi";

import { useRecoilState } from 'recoil'
import { navbarMenuState } from '@/atoms/states'

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	return (
		<div className="z-20 2xl:w-6/12 xl:w-7/12 lg:w-8/12 w-10/12 absolute h-0 border-white/30 flex items-center justify-center py-12 border-b-[0.1px] bg-background">
			<div className="w-full flex justify-between items-center">
				<div>
					<div className="uppercase text-3xl font-medium tracking-wide">
						Akshay Bhat
					</div>
				</div>
				<a className="text-2xl " >
					<HiOutlineDotsVertical className='cursor-pointer hover:text-white/70' onClick={(e) => {
						e.stopPropagation()
						isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
					}} />
				</a>
			</div>
			{isMenuOpen &&
				<div className="bg-[#222222] relative" onClick={(e) => {
					e.stopPropagation()
				}}>
					<div className="absolute right-0 top-5 mr-6 bg-background flex flex-col border-primary/70 border-[0.1px] rounded-lg tracking-wide">
						<div className="px-10 py-4 hover:bg-[#333333] cursor-pointer">
							Test
						</div>
						<div className="px-10 py-4 hover:bg-[#333333] cursor-pointer">
							Test
						</div>
						<div className="px-10 py-4 hover:bg-[#333333] cursor-pointer">
							Test
						</div>
					</div>
				</div>
			}
		</div>
	)
}
export default NavBar
