'use client'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { navbarMenuState, modalStateData, contextMenuState, signInState, adminState, redisCommits, allPosts } from '@/atoms/states'
import { usePathname } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';

const DialogBox = ({ isModal, isHome, extraActions}: { isModal: boolean, isHome: boolean, extraActions: menuItems[] }) => {
	const [isRender, setIsRender] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	const [isContextOpen, setIsContextOpen] = useRecoilState(contextMenuState)
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)
	const [allPostsData, setAllPostsData] = useRecoilState(allPosts)

	const [redisCommitsData, setRedisCommitsData] = useRecoilState(redisCommits)

	const [isSignedIn, setIsSignedIn] = useRecoilState(signInState)
	const [isAdmin, setIsAdmin] = useRecoilState(adminState)

	const [menuItems, setMenuItems] = useState<menuItems[]>([])

	const SignInHandler = () => {

	}

	const SignOutHandler = () => {

	}

	const PinHandler = () => {
		setRedisCommitsData(prev => {
			return {
				...prev,
				[isContextOpen.id]: {
					original: { ...(prev[isContextOpen.id]?.original || allPostsData[isContextOpen.id]) },
					history: [
						...(prev[isContextOpen.id]?.history || []),
						{
							action: allPostsData[isContextOpen.id].pinned === true ? "unpin_post" : "pin_post",
							payload: {
								...allPostsData[isContextOpen.id],
								pinned: allPostsData[isContextOpen.id].pinned === true ? false : true
							}
						}
					]
				}
			}
		})
	}

	const DeleteHandler = () => {
		setRedisCommitsData(prev => {
			return {
				...prev,
				[isContextOpen.id]: {
					original: { ...(prev[isContextOpen.id]?.original || allPostsData[isContextOpen.id]) },
					history: [
						...(prev[isContextOpen.id]?.history || []),
						{
							action: "delete_post",
							payload: {}
						}
					]
				}
			}
		})
	}

	const MarkHandler = () => {

	}

	const NavBarMenuItemsBefore: menuItems[] = [
		{
			title: "Sign In",
			onClickHandler: SignInHandler
		}
	]

	const NavBarMenuItemsAfter: menuItems[] = [
		{
			title: "Bookmarks",
		},
		{
			title: "Sign Out",
			onClickHandler: SignOutHandler
		}
	]

	const NavBarMenuItemsHomeAdmin: menuItems[] = [
		{
			title: "New Post",
		},
		{
			title: "Commit",
		}
	]

	const PostItemsAdmin: menuItems[] = [
		{
			title: "Edit MetaData",
		},
		{
			title: "Edit Post",
		},
		{
			title: "Pin / UnPin",
			onClickHandler: PinHandler
		},
		{
			title: "Delete",
			onClickHandler: DeleteHandler
		}
	]

	const PostItemsNormal: menuItems[] = [
		{
			title: "Mark It",
			onClickHandler: MarkHandler
		}
	]


	useEffect(() => {
		if (isModal) {
			if (isAdmin) {
				setMenuItems([...PostItemsNormal, ...PostItemsAdmin, ...extraActions])
			} else {
				setMenuItems([...PostItemsNormal, ...extraActions])
			}
		} else {
			if (isSignedIn) {
				setMenuItems([...PostItemsNormal, ...NavBarMenuItemsAfter])
				if (isAdmin) {
					if (isHome) {
						setMenuItems([...NavBarMenuItemsHomeAdmin, ...NavBarMenuItemsAfter])
					} else {
						setMenuItems([...PostItemsNormal, ...PostItemsAdmin, ...NavBarMenuItemsAfter])
					}
				}
			} else {
				setMenuItems([...NavBarMenuItemsBefore])
			}
		}
		setIsRender(true)
	}, [])

	return isRender && (
		<div className="bg-[#222222] relative" onClick={(e) => {
			e.stopPropagation()
		}}>
			<div className="absolute left-[-100px] w-fit top-6 bg-background flex flex-col border-primary/40 border-[0.1px] rounded-lg tracking-tight animate-fade">
				{
					menuItems.map((ele, idx) => {
						return (
							<div className="px-4 py-2 text-nowrap hover:bg-[#333333] cursor-pointer text-sm" key={`${isModal ? "modal" : "notmodal"}menuItems${idx}`} onClick={() => {
								if (ele.onClickHandler) {
									ele.onClickHandler()
								} else {
									setIsModalOpen(prev => {
										return {
											open: true,
											title: ele.title
										}
									})
								}
								setIsMenuOpen(false)
								setIsContextOpen(prev => {
									return {
										...prev,
										open: false
									}
								})
							}}>
								<span>
									{ele.title}
								</span>
							</div>
						)
					})
				}
			</div>
		</div >

	)
}
export default DialogBox
