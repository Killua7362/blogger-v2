'use client'

import { useRecoilValue } from 'recoil'
import { contextMenuState } from '@/atoms/states'

import DialogBox from '@/ui/common/dialogbox'

const ContextMenu = () => {
	const contextMenuMetaData = useRecoilValue(contextMenuState)
	return <div className="z-30 absolute" style={{ left: contextMenuMetaData.points[0] + 90, top: contextMenuMetaData.points[1] - 30 }} onClick={(e) => {
		e.stopPropagation()
	}}>
		<DialogBox isModal={true} isHome={false} extraActions={[]} />
	</div>
}
export default ContextMenu

//edit post
//edit metadata
//pin the post
//delete the post
