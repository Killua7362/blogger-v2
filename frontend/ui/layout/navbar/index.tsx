'use client'
import { Fragment } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { contextMenuState, navbarMenuState, modalStateData, userDataState } from '@/atoms/states'
import DialogBox from '@/ui/common/dialogbox'

import Modal from '@/ui/components/home/modals'

import Link from 'next/link';

const NavBar = ({ isHome }: { isHome: boolean }) => {
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	const isModalOpen = useRecoilValue(modalStateData)
	const setContextMenuMetaData = useSetRecoilState(contextMenuState)
	const userData = useRecoilValue(userDataState)
	return (
		<Fragment>
			{
				isModalOpen.open &&
				<Modal />
			}
			<div className="z-20 2xl:w-6/12 xl:w-7/12 lg:w-8/12 w-10/12 absolute h-0 border-primary/40 flex items-center justify-center py-14 border-b-[0.1px] bg-background">
				<div className="w-full flex justify-between items-center">
					<Link href="/" className='no-underline text-white'>

						<div className='flex gap-x-2 uppercase text-base tracking-wider items-center'>
							<div>
								Welcome
							</div>
							<div className=''>
								{userData.name}
							</div>
						</div>
						<div className="uppercase text-3xl font-medium tracking-wide">
							Black Grimore
						</div>
					</Link>
					<a className="text-xl flex items-center justify-center cursor-pointer hover:text-white/80 hover:bg-[#333333]/30 bg-background px-3 py-1 rounded-xl border-primary/40 border-[0.1px]" onClick={(e) => {
						e.stopPropagation()
						setContextMenuMetaData(prev => {
							return {
								...prev,
								open: false
							}
						})
						isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
					}} >
						<span className="text-sm tracking-wider uppercase">
							Menu
						</span>
						<HiOutlineDotsVertical />
					</a>
				</div>
				{isMenuOpen &&
					<DialogBox isModal={false} isHome={isHome} extraActions={[]} />
				}
			</div>
		</Fragment>
	)
}
export default NavBar
