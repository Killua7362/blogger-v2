import { useRecoilState } from 'recoil'
import { navbarMenuState, contextMenuState } from '@/atoms/states'


const DialogBox = ({ menuItems }: { menuItems: Object[] }) => {
	const [isMenuOpen, setIsMenuOpen] = useRecoilState(navbarMenuState)
	const [isContextOpen, setIsContextOpen] = useRecoilState(contextMenuState)

	return <div className="bg-[#222222] relative" onClick={(e) => {
		e.stopPropagation()
	}}>
		<div className="absolute left-[-100px] w-32 text-base top-6 bg-background flex flex-col border-secondary/70 border-[0.1px] rounded-lg tracking-wide">
			{
				Object.keys(menuItems).map((key, idx) => {
					return (
						<div className="p-2 hover:bg-[#333333] cursor-pointer" onClick={() => {
							menuItems[key].onClickHandler()
							setIsMenuOpen(false)
							setIsContextOpen({
								open: false,
								points: [0, 0]
							})
						}}>
							<span>
								{menuItems[key].title}
							</span>
						</div>
					)
				})
			}
		</div>
	</div>
}
export default DialogBox
