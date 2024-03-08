'use client'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { navbarMenuState, modalActiveState, contextMenuState, signInState, adminState } from '@/atoms/states'
import { usePathname } from 'next/navigation'

const DialogBox = ({ isModal, isHome, extraActions }: { isModal: boolean, isHome: boolean, extraActions: menuItems[] }) => {
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	const [isContextOpen, setIsContextOpen] = useRecoilState(contextMenuState)
	const [isSignedIn, setIsSignedIn] = useRecoilState(signInState)
	const [isAdmin, setIsAdmin] = useRecoilState(adminState)

	const [isRender, setIsRender] = useState(false)
	const [menuItems, setMenuItems] = useState<menuItems[]>([])

	const SignInHandler = () => {

	}

	const SignOutHandler = () => {

	}

	const BookMarkHandler = () => {

	}

	const NewPostHandler = () => {

	}

	const CommitHandler = () => {

	}

	const EditPostHandler = () => {

	}

	const PinHandler = () => {

	}

	const EditMetadata = () => {

	}

	const DeleteHandler = () => {

	}

	const NavBarMenuItemsBefore:menuItems[] = [
		{
			title: "Sign In",
			onClickHandler: SignInHandler
		}
	]

	const NavBarMenuItemsAfter:menuItems[] = [
		{
			title: "Bookmarks",
			onClickHandler: BookMarkHandler
		},
		{
			title: "Sign Out",
			onClickHandler: SignOutHandler
		}
	]

	const NavBarMenuItemsHomeAdmin:menuItems[] = [
		{
			title: "New Post",
			onClickHandler: NewPostHandler
		},
		{
			title: "Commit",
			onClickHandler: CommitHandler
		}
	]

	const PostItemsAdmin:menuItems[] = [
		{
			title: "Edit MetaData",
			onClickHandler: EditMetadata
		},
		{
			title: "Edit Post",
			onClickHandler: EditPostHandler
		},
		{
			title: "Pin",
			onClickHandler: PinHandler
		},
		{
			title: "Delete",
			onClickHandler: DeleteHandler
		}
	]


	useEffect(() => {
		if (isModal) {
			if (isAdmin) {
				setMenuItems([...PostItemsAdmin, ...extraActions])
			} else {
				setMenuItems([...extraActions])
			}
		} else {
			if (isSignedIn) {
				setMenuItems([...NavBarMenuItemsAfter])
				if (isAdmin) {
					if (isHome) {
						setMenuItems([...NavBarMenuItemsHomeAdmin, ...NavBarMenuItemsAfter])
					} else {
						setMenuItems([...PostItemsAdmin, ...NavBarMenuItemsAfter])
					}
				}
			} else {
				setMenuItems([...NavBarMenuItemsBefore])
			}
		}
		setIsRender(true)
	}, [])
	console.log(menuItems)
	return isRender && (
		<div className="bg-[#222222] relative" onClick={(e) => {
			e.stopPropagation()
		}}>
			<div className="absolute left-[-100px] w-fit top-6 bg-background flex flex-col border-secondary/70 border-[0.1px] rounded-lg tracking-wide">
				{
					menuItems.map((ele, idx) => {
						return (
							<div className="px-4 py-2 text-nowrap hover:bg-[#333333] cursor-pointer text-sm" onClick={() => {
								ele.onClickHandler()
								setIsMenuOpen(false)
								setIsContextOpen({
									open: false,
									points: [0, 0]
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
		</div>

	)
}
export default DialogBox
