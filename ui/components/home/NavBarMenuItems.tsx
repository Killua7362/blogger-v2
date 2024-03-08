
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

export const NavBarMenuItemsBefore = [
	{
		title: "Sign In",
		onClickHandler: SignInHandler
	}
]

export const NavBarMenuItemsAfter = [
	{
		title: "Bookmarks",
		onClickHandler: BookMarkHandler
	},
	{
		title: "Sign Out",
		onClickHandler: SignOutHandler
	}
]

export const NavBarMenuItemsAdmin = [
	{
		title: "New Post",
		onClickHandler: NewPostHandler
	},
	{
		title: "Commit",
		onClickHandler: CommitHandler
	}
]

