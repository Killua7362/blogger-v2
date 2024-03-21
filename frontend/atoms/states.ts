import { DefaultValue, GetRecoilValue, SetRecoilState, atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import axios from 'axios'

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

const userDataStateSelectorHelper = selector({
	key: 'userDataStateSelectorHelper',
	get: async ({ get }) => {
		let result: userData = {
			name: "Guest",
			role: "viewer",
			logged_in: false,
		}
		if (typeof window === 'undefined') return result as userData;
		await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sessions/logged_in`, { withCredentials: true }).then((res) => {
			result = { ...res.data }
		}).catch((err) => {
			console.log(err)
		})
		return result as userData
	},
})
export const userDataStateSelector = selector({
	key: 'userDataStateSelector',
	get: ({ get }) => {
		if (typeof window === 'undefined') return {
			name: "Guest",
			role: "viewer",
			logged_in: false,
		} as userData
		return get(userDataStateSelectorHelper) as userData
	},
	set: ({ set, get }, user) => {
		const currState: userData = get(userDataState)
		set(userDataState, { ...currState, ...user })
	}
})

export const userDataState = atom({
	key: 'userDataState',
	default: userDataStateSelector
})

// getting post from database

const postsSetFunction = async (set: SetRecoilState, get: GetRecoilValue, posts: allPosts) => {
	const currDB: allPosts = get(postsFetcher)
	let result: allPosts = {}
	for (let key in posts) {
		let payload = posts[key]
		let size = Object.keys(payload).length

		if (key in currDB) {
			//update and delete
			if (size === 0) {
				//delete call
				await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${key}`, { withCredentials: true })
					.catch(error => console.log(error))
			} else {
				//modify call
				await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${key}`, { ...payload }, { withCredentials: true })
					.then(res => {
						result[res.data.data.id] = res.data.data.attributes
					})
					.catch(error => console.log(error))
			}
		} else {
			//create
			if (size !== 0) {
				await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, payload, { withCredentials: true })
					.then(res => {
						result[res.data.data.id] = res.data.data.attributes
					}).catch(error => console.log(error))
			}
		}
	}
	axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits`, { withCredentials: true })
		.catch(error => console.log(error))

	localStorage.removeItem('all_commits')
	localStorage.removeItem('posts')
}

export const postsFetcherSelector = selector({
	key: 'postsFetcherSelector',
	get: async () => {
		if (typeof window === 'undefined') return {} as allPosts;
		//fetch from database
		const data = localStorage.getItem('posts')
		let result: allPosts = {}

		if (!data) {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, { withCredentials: true })
			for (let arr of res.data.data) {
				result[arr['id']] = { ...arr['attributes'] }
			}
			localStorage.setItem('posts', JSON.stringify({ ...result }));
			return result;
		}
		return JSON.parse(data) as allPosts
	},
	set: ({ set, get }, posts) => {

		const userData = get(userDataState)
		if (userData.logged_in && userData.role === 'admin') {
			//api set posts
			postsSetFunction(set, get, { ...posts })
		}
	}
})

export const postsFetcher = atom({
	key: "postsFetcher",
	default: postsFetcherSelector
})

//getting redis values
const redisSetFunction = (set: SetRecoilState, get: GetRecoilValue, newPost: redisCommits) => {
	let currState = { ...get(redisCommits) }
	let size = Object.keys(newPost).length
	if (size === 0) {
		//empty call should clear the redis
		axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits`, { withCredentials: true })
		set(redisCommits, {})
		localStorage.removeItem('all_commits')
	}
	else if (size === 1) {
		let key = Object.keys(newPost)[0]
		if ((newPost[key]?.history || []).length === 0) {
			delete currState[key]
			localStorage.setItem('all_commits', JSON.stringify({ ...currState }))
			set(redisCommits, { ...currState })
			axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits/${key}`, { withCredentials: true })
		} else {
			localStorage.setItem('all_commits', JSON.stringify({ ...currState, ...newPost }))
			set(redisCommits, { ...currState, ...newPost })
			axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits/${key}`, { ...newPost }, { withCredentials: true })
		}
	} else {
		let result: redisCommits = {}
		for (let key in newPost) {
			if ((newPost[key]?.history || []).length === 0) {
				delete currState[key]
				axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits/${key}`, { withCredentials: true })
			} else {
				result[key] = newPost[key]
				axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits/${key}`, { ...result[key] }, { withCredentials: true })
			}
		}
		localStorage.setItem('all_commits', JSON.stringify({ ...currState, ...result }))
		set(redisCommits, { ...currState, ...result })
	}
}

export const redisSelector = selector({
	key: "redisSelector",
	get: async ({ get }) => {
		if (typeof window === 'undefined') return {} as redisCommits;
		const userData = get(userDataState)
		if (userData.logged_in && userData.role === 'admin') {
			const data = localStorage.getItem('all_commits')
			if (!data) {
				// fetch api and set localstorage
				const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits`, { withCredentials: true }).catch((err) => {
					return {} as redisCommits
				})
				const result: redisCommits = {}
				for (const key in (res?.data || {})) {
					if (res.data[key]) {
						result[key] = JSON.parse(res.data[key])
					}
				}
				localStorage.setItem('all_commits', JSON.stringify({ ...result }))
				return { ...result } as redisCommits
			}
			return JSON.parse(data) as redisCommits
		} else {
			return {} as redisCommits
		}
	},
	set: ({ set, get }, newPost) => {
		const userData = get(userDataState)
		if (userData.logged_in && userData.role === 'admin') {
			redisSetFunction(set, get, { ...newPost })
		}
	}
})

export const redisCommits = atom({
	key: "redisCommits",
	default: redisSelector
})

//mixing redis values and posts
export const allPostsSelector = selector({
	key: "allPostsSelector",
	get: ({ get }) => {
		const dbPosts = get(postsFetcher)
		const userData = get(userDataState)
		if (userData.logged_in && userData.role === 'admin') {
			const allCommits = get(redisCommits)
			let result: allPosts = {}
			for (let id in allCommits) {
				if ((allCommits[id]?.history || []).length !== 0) {
					let payload = (allCommits[id]?.history).slice(-1)[0].payload
					result[id] = payload
				}
			}

			return { ...dbPosts, ...result } as allPosts
		} else {
			return { ...dbPosts } as allPosts
		}
	}
})

export const allPosts = atom({
	key: "allPosts",
	default: allPostsSelector
})
