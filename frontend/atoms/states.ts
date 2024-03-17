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

export const adminState = atom({
	key: 'adminState',
	default: false as boolean
})

export const signInState = atom({
	key: 'signInState',
	default: true as boolean
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
				await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${key}`)
					.catch(error => console.log(error))
			} else {
				//modify call
				await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${key}`, { ...payload })
					.then(res => {
						result[res.data.data.id] = res.data.data.attributes
					})
					.catch(error => console.log(error))
			}
		} else {
			//create
			if (size !== 0) {
				await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, payload)
					.then(res => {
						result[res.data.data.id] = res.data.data.attributes
					}).catch(error => console.log(error))
			}
		}
	}
	axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits`)
		.catch(error => console.log(error))

	localStorage.removeItem('all_commits')
	localStorage.removeItem('posts')
}

export const postsFetcherSelector = selector({
	key: 'postsFetcherSelector',
	get: async () => {
		//fetch from database
		const data = localStorage.getItem('posts')
		let result: allPosts = {}

		if (!data) {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`)
			for (let arr of res.data.data) {
				result[arr['id']] = { ...arr['attributes'] }
			}
			localStorage.setItem('posts', JSON.stringify({ ...result }));
			return result;
		}
		return JSON.parse(data) as allPosts
	},
	set: ({ set, get }, posts) => {
		//api set posts
		postsSetFunction(set, get, {...posts})
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
		axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits`)
		set(redisCommits, {})
		localStorage.removeItem('all_commits')
	}
	else if (size === 1) {
		let key = Object.keys(newPost)[0]
		if ((newPost[key]?.history || []).length === 0) {
			console.log('came here')
			delete currState[key]
			localStorage.setItem('all_commits', JSON.stringify({ ...currState }))
			set(redisCommits, { ...currState })
			axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits/${key}`)
		} else {
			localStorage.setItem('all_commits', JSON.stringify({ ...currState, ...newPost }))
			set(redisCommits, { ...currState, ...newPost })
			axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits/${key}`, { ...newPost })
		}
	} else {
		let result: redisCommits = {}
		for (let key in newPost) {
			if ((newPost[key]?.history || []).length === 0) {
				delete currState[key]
				axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits/${key}`)
			} else {
				result[key] = newPost[key]
				axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits/${key}`, { ...result[key] })
			}
		}
		localStorage.setItem('all_commits', JSON.stringify({ ...currState, ...result }))
		set(redisCommits, { ...currState, ...result })
	}
}

export const redisSelector = selector({
	key: "redisSelector",
	get: async () => {
		const data = localStorage.getItem('all_commits')
		if (!data) {
			// fetch api and set localstorage
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commits`)
			const result: redisCommits = {}
			for (const key in res.data) {
				if (res.data[key]) {
					result[key] = JSON.parse(res.data[key])
				}
			}
			localStorage.setItem('all_commits', JSON.stringify({ ...result }))
			return { ...result } as redisCommits
		}
		return JSON.parse(data) as redisCommits
	},
	set: ({ set, get }, newPost) => {
		redisSetFunction(set, get, { ...newPost })
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
		const allCommits = get(redisCommits)

		let result: allPosts = {}
		for (let id in allCommits) {
			if ((allCommits[id]?.history || []).length !== 0) {
				let payload = (allCommits[id]?.history).slice(-1)[0].payload
				result[id] = payload
			}
		}

		return { ...dbPosts, ...result } as allPosts
	}
})

export const allPosts = atom({
	key: "allPosts",
	default: allPostsSelector
})
