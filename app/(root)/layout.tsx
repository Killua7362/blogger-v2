'use client'
import { Fragment, useState, useEffect } from 'react'

import NavBar from "@/ui/layout/navbar";
import Footer from "@/ui/layout/footer";

import { useRecoilState } from 'recoil'
import { navbarMenuState, redisCommits, contextMenuState, modalStateData, allPosts } from '@/atoms/states'

import { usePathname, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

const RootLayout = (
	{ children }: { children: React.ReactNode }
) => {
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	const [contextMenuMetaData, setContextMenuMetaData] = useRecoilState(contextMenuState)
	const [isRender, setIsRender] = useState(false)
	const [isHome, setIsHome] = useState(true)
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)

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

	const variants = {
		hidden: { opacity: 0, x: 0, y: -200 },
		enter: { opacity: 1, x: 0, y: 0 },
		exit: { opacity: 0, x: 0, y: -200 },
	}

	return isRender && (
		<motion.div
			key={pathname}
			initial="hidden"
			animate="enter"
			exit="exit"
			variants={variants}
			transition={{ duration: 0.4, type: "linear" }}
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
		</motion.div>
	)
}
export default RootLayout
