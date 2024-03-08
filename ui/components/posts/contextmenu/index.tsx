'use client'

import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { contextMenuState } from '@/atoms/states'

import DialogBox from '@/ui/common/dialogbox'
import { ContextMenuItemsAdmin } from '@/ui/components/post/ContextMenuItems'

const ContextMenu = () => {
	const [contextMenuMetaData, setContextMenuMetaData] = useRecoilState(contextMenuState)
	const [isRender, setIsRender] = useState(false)
	const [menuItems, setMenuItems] = useState<Object[]>([])

	useEffect(() => {
		setMenuItems(ContextMenuItemsAdmin)
		setIsRender(true)
	}, [])

	return <div className="z-20 absolute" style={{ left: contextMenuMetaData.points[0] + 100, top: contextMenuMetaData.points[1] - 20 }} onClick={(e) => {
		e.stopPropagation()
	}}>
		<DialogBox menuItems={{ ...menuItems }} />
	</div>
}
export default ContextMenu

//edit post
//edit metadata
//pin the post
//delete the post
