'use client'

import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { contextMenuState } from '@/atoms/states'

import DialogBox from '@/ui/common/dialogbox'

const ContextMenu = () => {
	const [contextMenuMetaData, setContextMenuMetaData] = useRecoilState(contextMenuState)

	return <div className="z-30 absolute" style={{ left: contextMenuMetaData.points[0] + 100, top: contextMenuMetaData.points[1] - 33 }} onClick={(e) => {
		e.stopPropagation()
	}}>
		<DialogBox isModal={true} isHome={false} extraActions={[]} id={-1} />
	</div>
}
export default ContextMenu

//edit post
//edit metadata
//pin the post
//delete the post
