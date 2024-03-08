'use client'
import { Fragment } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState, useEffect } from 'react'

import { useRecoilState } from 'recoil'
import { navbarMenuState } from '@/atoms/states'
import DialogBox from '@/ui/common/dialogbox'

import { usePathname } from 'next/navigation'
import { NavBarMenuItemsBefore, NavBarMenuItemsAdmin } from "@/ui/components/home/NavBarMenuItems";
import Modal from '@/ui/components/home/modals'

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	const [isRender, setIsRender] = useState(false)
	const [menuItems, setMenuItems] = useState<Object[]>([])

	useEffect(() => {
		setMenuItems(NavBarMenuItemsAdmin)
		setIsRender(true)
	}, [])

	return isRender && (
		<Fragment>
			<Modal />
			<div className="z-20 2xl:w-6/12 xl:w-7/12 lg:w-8/12 w-10/12 absolute h-0 border-white/30 flex items-center justify-center py-12 border-b-[0.1px] bg-background">
				<div className="w-full flex justify-between items-center">
					<div>
						<div className="uppercase text-3xl font-medium tracking-wide">
							Akshay Bhat
						</div>
					</div>
					<a className="text-xl flex items-center justify-center cursor-pointer hover:text-white/70 bg-[#333333] px-3 py-1 rounded-xl border-secondary border-[0.1px]" onClick={(e) => {
						e.stopPropagation()
						isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
					}} >
						<span className="text-base">
							Menu
						</span>
						<HiOutlineDotsVertical />
					</a>
				</div>
				{isMenuOpen &&
					<DialogBox menuItems={{ ...menuItems }} />
				}
			</div>
		</Fragment>
	)
}
export default NavBar
