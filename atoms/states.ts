import { atom } from 'recoil'

export const navbarMenuState = atom({
	key: 'navbarMenuState',
	default: false
})

export const contextMenuState = atom({
	key: 'contextMenuState',
	default: { open: false, points: [0, 0] }
})

export const modalActiveState = atom({
	key: 'modalActiveState',
	default: false
})

export const adminState = atom({
	key: 'adminState',
	default: true
})

export const signInState = atom({
	key:'signInState',
	default:true
})
