import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const navbarMenuState = atom({
	key: 'navbarMenuState',
	default: false,
})

export const contextMenuState = atom({
	key: 'contextMenuState',
	default: { open: false, points: [0, 0], id: "" }
})

export const modalStateData = atom({
	key: 'modalStateData ',
	default: {
		open: false,
		title: ""
	}
})

export const adminState = atom({
	key: 'adminState',
	default: true
})

export const signInState = atom({
	key: 'signInState',
	default: true
})

export const allPosts = atom({
	key: "allPosts",
	default: {
		"1": {
			title: "title",
			description: "description",
			content: "Empty Post",
			pinned: false,
			tags: "tag1,tag2",
			createdOn: "today",
			updatedOn: "yesterday"
		},
		"2": {
			id: "2",
			title: "title",
			description: "description",
			content: "Empty Post",
			pinned: true,
			tags: "tag1,tag2",
			createdOn: "today",
			updatedOn: "yesterday"
		},
	},
})

export const redisCommits = atom({
	key: "redisCommits",
	default: {
	},
})

