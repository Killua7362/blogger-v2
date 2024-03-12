import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const navbarMenuState = atom({
	key: 'navbarMenuState',
	default: false as boolean,
})

export const contextMenuState = atom({
	key: 'contextMenuState',
	default: { open: false, points: [0, 0], id: "" } as contextMenuData
})

export const modalStateData = atom({
	key: 'modalStateData ',
	default: {
		open: false,
		title: ""
	} as modalStateData
})

export const adminState = atom({
	key: 'adminState',
	default: true as boolean
})

export const signInState = atom({
	key: 'signInState',
	default: true as boolean
})

export const allPosts = atom({
	key: "allPosts",
	default: {
		"1": {
			title: "b",
			description: "description",
			content: "Empty Post",
			pinned: false,
			tags: "tag1,tag2",
			createdOn: "today",
			updatedOn: "yesterday"
		},
		"2": {
			title: "a",
			description: "description",
			content: "Empty Post",
			pinned: true,
			tags: "tag1,tag2",
			createdOn: "today",
			updatedOn: "yesterday"
		},
	} as allPosts
})

export const redisCommits = atom({
	key: "redisCommits",
	default: {
	} as redisCommits
})

