'use client'
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { navbarMenuState, modalStateData, contextMenuState, redisCommits, allPosts, redisSelector, userDataState, userDataStateSelector } from '@/atoms/states'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const DialogBox = ({ isModal, isHome, extraActions }: { isModal: boolean, isHome: boolean, extraActions: menuItems[] }) => {
	const [isRender, setIsRender] = useState(false)
	const setIsMenuOpen = useSetRecoilState(navbarMenuState)
	const [isContextOpen, setIsContextOpen] = useRecoilState(contextMenuState)
	const setIsModalOpen = useSetRecoilState(modalStateData)
	const allPostsData = useRecoilValue(allPosts)
	const setRedisCommitsData = useSetRecoilState(redisSelector)
	const redisCommitsData = useRecoilValue(redisCommits)

	const userData = useRecoilValue(userDataState)
	const setUserData = useSetRecoilState(userDataStateSelector)

	const [menuItems, setMenuItems] = useState<menuItems[]>([])

	const router = useRouter()

	const SignInHandler = () => {
		router.push('/signin')
	}

	const SignOutHandler = async () => {
		await axios.delete(`${process.env.BACKEND_URL}/api/sessions/logout`, { withCredentials: true }).then((res) => {
			setUserData({
				name: "Guest",
				role: "viewer",
				logged_in: false,
			})
			window.location.reload();
		}).catch((err) => {
			console.log(err)
		})
	}

	const PinHandler = () => {
		let payload: redisCommits = {
			[isContextOpen.id]: {
				original: { ...(redisCommitsData[isContextOpen.id]?.original || allPostsData[isContextOpen.id]) },
				history: [
					...(redisCommitsData[isContextOpen.id]?.history || []),
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
		setRedisCommitsData(payload)
	}

	const DeleteHandler = () => {
		let payload: redisCommits = {
			[isContextOpen.id]: {
				original: { ...(redisCommitsData[isContextOpen.id]?.original || allPostsData[isContextOpen.id]) },
				history: [
					...(redisCommitsData[isContextOpen.id]?.history || []),
					{
						action: "delete_post",
						payload: {}
					}
				]
			}
		}
		setRedisCommitsData(payload)
	}


	const CacheHandler = () => {
		localStorage.removeItem('all_commits')
		localStorage.removeItem('posts')
		window.location.reload()
	}

	const NavBarMenuItemsBefore: menuItems[] = [
		{
			title: "Sign In",
			onClickHandler: SignInHandler
		}
	]

	const NavBarMenuItemsAfter: menuItems[] = [
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
		},
		{
			title: "Clear Cache",
			onClickHandler: CacheHandler
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

	useEffect(() => {
		if (isModal) {
			if (userData.role === 'admin') {
				setMenuItems([...PostItemsAdmin, ...extraActions])
			} else {
				setMenuItems([...extraActions])
			}
		} else {
			if (userData.logged_in) {
				if (userData.role === 'admin') {
					if (isHome) {
						setMenuItems([...NavBarMenuItemsHomeAdmin, ...NavBarMenuItemsAfter])
					} else {
						setMenuItems([...PostItemsAdmin, ...NavBarMenuItemsAfter])
					}
				} else {
					setMenuItems([...NavBarMenuItemsAfter])
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
			<div className="absolute left-[-100px] top-[17px] w-fit top-6 bg-background flex flex-col border-primary/40 border-[0.1px] rounded-lg tracking-tight animate-fade">
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
