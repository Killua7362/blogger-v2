import { Fragment } from 'react'

const HomeLayout = (
	{ children }: { children: React.ReactNode }
) => {
	return (
		<Fragment>
			{children}
		</Fragment>
	)
}
export default HomeLayout
