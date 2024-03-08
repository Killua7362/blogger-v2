'use client'
import { Fragment, useState, useEffect } from 'react'

import NavBar from "@/ui/layout/navbar";
import Footer from "@/ui/layout/footer";

import { useRecoilState } from 'recoil'
import { navbarMenuState, contextMenuState } from '@/atoms/states'

import { usePathname, useSearchParams } from 'next/navigation'

const RootLayout = (
	{ children }: { children: React.ReactNode }
) => {
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	const [contextMenuMetaData, setContextMenuMetaData] = useRecoilState(contextMenuState)
	const [isRender, setIsRender] = useState(false)
	const [isHome, setIsHome] = useState(true)
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
	}, [pathname])

	return isRender && (
		<div className="min-h-screen flex flex-col items-center justify-between"
			onClick={() => {
				setIsMenuOpen(false)
				setContextMenuMetaData({ open: false, points: [0, 0] })
			}}
			onContextMenu={() => {
				setIsMenuOpen(false)
				setContextMenuMetaData({ open: false, points: [0, 0] })
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
