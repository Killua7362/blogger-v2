'use client'
import { Fragment } from 'react'

import { useRecoilState } from 'recoil'
import { modalStateData } from '@/atoms/states'
import NewPostModal from '@/ui/components/home/modals/NewPost'
import EditMetaData from '@/ui/components/home/modals/EditMetaData'
import EditPost from '@/ui/components/home/modals/EditPost'
import CommitModal from '@/ui/components/home/modals/Commit'
import BookMarkModal from '@/ui/components/home/modals/Bookmarks'
import FilterModal from '@/ui/components/home/modals/FilterModal'


const Modal = () => {
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateData)
	return (
		<Fragment>
			<div className="text-white fixed z-30 min-h-screen w-screen bg-background/70 flex justify-center items-center animate-fade" onClick={(e) => {
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
						'Edit MetaData': <EditMetaData />,
						'filter': <FilterModal />
					}[isModalOpen.title]

				}
			</div>
		</Fragment>
	)
}

export default Modal
