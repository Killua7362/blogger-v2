'use client'
import { Fragment } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState, useEffect } from 'react'

import { useRecoilState } from 'recoil'
import { contextMenuState, navbarMenuState, modalStateData, allPosts, redisCommits } from '@/atoms/states'
import DialogBox from '@/ui/common/dialogbox'

import { usePathname } from 'next/navigation'
import Modal from '@/ui/components/home/modals'

import Link from 'next/link';
import { redirect } from 'next/navigation';

const NavBar = ({ isHome }: { isHome: boolean }) => {
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)
	const [contextMenuMetaData, setContextMenuMetaData] = useRecoilState(contextMenuState)

	const [redisCommitsData, setRedisCommitsData] = useRecoilState(redisCommits)
	const [allPostsData, setAllPostsData] = useRecoilState(allPosts)

	useEffect(() => {
		let result: allPosts = {}
		for (let id in redisCommitsData) {
			if (redisCommitsData[id].history.length !== 0) {
				result[id] = (redisCommitsData[id].history.slice(-1)[0].payload)
			} else {
				result[id] = redisCommitsData[id].original
			}
		}
		setAllPostsData(prev => {
			return {
				...prev,
				...result
			}
		})
	}, [redisCommitsData])

	return (
		<Fragment>
			{
				isModalOpen.open &&
				<Modal />
			}
			<div className="z-20 2xl:w-6/12 xl:w-7/12 lg:w-8/12 w-10/12 absolute h-0 border-primary/40 flex items-center justify-center py-12 border-b-[0.1px] bg-background">
				<div className="w-full flex justify-between items-center">
					<Link href="/" className='no-underline text-white'>
						<div className="uppercase text-3xl font-medium tracking-wide">
							Akshay Bhat
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
