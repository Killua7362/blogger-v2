'use client'
import { Fragment } from 'react'

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

import { useRecoilState } from 'recoil'
import { navbarMenuState, contextMenuState } from '@/atoms/states'

const RootLayout = (
	{ children }: { children: React.ReactNode }
) => {
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	const [contextMenuMetaData, setContextMenuMetaData] = useRecoilState(contextMenuState)

	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-between"
			onClick={() => {
				setIsMenuOpen(false)
				setContextMenuMetaData({ open: false, points: [0, 0] })
			}}
			onContextMenu={() => {
				setIsMenuOpen(false)
				setContextMenuMetaData({ open: false, points: [0, 0] })
			}}
		>
			<NavBar />
			<div className="pt-28 2xl:w-6/12 xl:w-7/12 lg:w-8/12 w-10/12" >
				{children}
			</div>
			<Footer />
		</div>
	)
}
export default RootLayout
