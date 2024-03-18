'use client'
import { useState, useEffect } from 'react'


import { useRecoilValue, useSetRecoilState } from 'recoil'
import { navbarMenuState, contextMenuState, modalStateData } from '@/atoms/states'

import { usePathname } from 'next/navigation'

import axios from 'axios'

import NavBar from "@/ui/layout/navbar";
import Footer from "@/ui/layout/footer";

const RootLayout = (
	{ children }: { children: React.ReactNode }
) => {
	const setIsMenuOpen = useSetRecoilState(navbarMenuState)
	const setContextMenuMetaData = useSetRecoilState(contextMenuState)
	const [isRender, setIsRender] = useState(false)
	const [isHome, setIsHome] = useState(true)
	const isModalOpen = useRecoilValue(modalStateData)
	const pathname = usePathname()

	useEffect(() => {
		if (pathname === '/post') {
			setIsHome(false)
		} else if (pathname === '/' || pathname === '/posts') {
			setIsHome(true)
		}
		if (!isRender) {
			setIsRender(true)
		}


	}, [pathname, isRender])

	return isRender && (
		<div
			className={`min-h-screen flex flex-col items-center justify-between w-full relative ${isModalOpen.open ? "fixed" : ""}`}
			onClick={() => {
				setIsMenuOpen(false)
				setContextMenuMetaData(prev => {
					return { ...prev, open: false }
				}
				)
			}}
			onContextMenu={() => {
				setIsMenuOpen(false)
				setContextMenuMetaData(prev => {
					return { ...prev, open: false }
				}
				)
			}}
		>
			<NavBar isHome={isHome} />
			<div className="pt-28 2xl:w-6/12 xl:w-7/12 lg:w-8/12 w-10/12" >
				{children}
			</div>
			<Footer />
		</div>
	)
}
export default RootLayout
