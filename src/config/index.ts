import { userApi } from './users'
import axios from 'axios'
import { postsApi } from './posts'
import { differentApi } from './different'
import Cookies from 'js-cookie'
import { profileApi } from './profile'
import { subsApi } from './subs'
import { commentsApi } from './comments'
import { rightBar } from './rightBar'
import { likeApi } from './likes'

export type ApiTypes = {
	user: ReturnType<typeof userApi>
	posts: ReturnType<typeof postsApi>
	different: ReturnType<typeof differentApi>
	profile: ReturnType<typeof profileApi>
	subs: ReturnType<typeof subsApi>
	comments: ReturnType<typeof commentsApi>
	rightBar: ReturnType<typeof rightBar>
	likes: ReturnType<typeof likeApi>
}

export const Api = (): ApiTypes => {
	const instance = axios.create({
		baseURL: 'http://localhost:4444',
	})

	instance.interceptors.request.use((config: any) => {
		config.headers.Authorization = Cookies.get('token')
		return config
	})

	return {
		user: userApi(instance),
		posts: postsApi(instance),
		different: differentApi(instance),
		profile: profileApi(instance),
		subs: subsApi(instance),
		comments: commentsApi(instance),
		rightBar: rightBar(instance),
		likes: likeApi(instance),
	}
}
