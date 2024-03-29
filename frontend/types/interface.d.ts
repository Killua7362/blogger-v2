interface contextMenuData {
	open: boolean;
	points: number[];
	id: string
}

interface menuItems {
	title: string;
	onClickHandler?: onClickHandler;
}

interface modalStateData {
	open: boolean;
	title: string;
}

interface Post {
	title?: string;
	description?: string;
	content?: string;
	pinned?: boolean;
	tags?: string;
	created_at?: string;
	updated_at?: string;
}

interface allPosts {
	[id: string]: Post
}

interface historyItems {
	action: string;
	payload: Post
}
interface historyItemsArray extends Array<historyItems> { }

interface redisItems {
	original: Post;
	history: historyItemsArray
}

interface redisCommits {
	[id: string]: redisItems
}

type sortType = 'created date' | 'modified date' | 'name' | 'word count'

interface filterConfig {
	headingName?: string;
	postsCount?: number;
	isPinned?: boolean;
	searchPrefix?: string;
	sortType?: sortType;
	reverse?: boolean;
}

interface previewButton {
	title: string;
	value: PreviewType;
}

interface userData {
	name: string;
	role: string;
	logged_in: boolean;
}
