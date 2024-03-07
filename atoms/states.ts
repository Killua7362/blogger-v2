import { atom } from 'recoil'

export const navbarMenuState = atom({
	key: 'navbarMenuState',
	default: false
})

export const contextMenuState = atom({
	key: 'contextMenuState',
	default: { open: false, points: [0, 0] }
})


