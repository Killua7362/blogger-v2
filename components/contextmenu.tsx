'use client'

import { useRecoilState } from 'recoil'
import { contextMenuState } from '@/atoms/states'

const ContextMenu = () => {
	const [contextMenuMetaData, setContextMenuMetaData] = useRecoilState(contextMenuState)

	return <div className="z-20 absolute h-32 w-32 bg-white" style={{ left: contextMenuMetaData.points[0], top: contextMenuMetaData.points[1] }} onClick={(e) => {
		e.stopPropagation()
	}}>
		<div>
		</div>
	</div>
}
export default ContextMenu
