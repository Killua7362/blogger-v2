'use client'
import { Fragment } from 'react'

import { useRecoilState } from 'recoil'
import { modalStateData } from '@/atoms/states'
import NewPostModal from '@/ui/components/home/modals/NewPost'
import EditMetaData from '@/ui/components/home/modals/EditMetaData'
import EditPost from '@/ui/components/home/modals/EditPost'
import CommitModal from '@/ui/components/home/modals/Commit'
import BookMarkModal from '@/ui/components/home/modals/Bookmarks'

const Modal = () => {
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)
	return (
		<Fragment>
			<div className="text-white fixed z-30 min-h-screen w-screen backdrop-blur-2xl flex justify-center items-center" onClick={(e) => {
				e.stopPropagation()
				setIsModalOpen(prev => {
					return {
						...prev,
						open: false
					}
				})
			}}>
				{
					{
						'': <div />,
						'New Post': <NewPostModal />,
						'Edit Post': <EditPost />,
						'Commit': <CommitModal />,
						'Bookmarks': <BookMarkModal />,
						'Edit MetaData': <EditMetaData />
					}[isModalOpen.title]

				}
			</div>
		</Fragment>
	)
}

export default Modal
