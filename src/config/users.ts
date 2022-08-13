import { AxiosInstance } from 'axios'
import { Itdo, Ilogin, IUser } from '../types/authTypes'
import { IPost } from '../types/postsTypes'

export const userApi = (instance: AxiosInstance) => ({
	async register(tdo: Itdo) {
		const { data } = await instance.post('/register', tdo)
		return data
	},
	async login(loginObj: Ilogin) {
		const { data } = await instance.post('/login', loginObj)
		return data
	},
	async getMe() {
		const { data } = await instance.get('/me')
		return data
	},
	async getUser(id: string | undefined) {
		const { data } = await instance.get<IUser>(`/user/${id}`)
		return data
	},
	async getUserPosts(id: string | undefined, search: string) {
		const { data } = await instance.get<IPost>(`/user/${search}/${id}`)
		return data
	},
})
