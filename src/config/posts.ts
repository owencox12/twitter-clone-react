import { AxiosInstance } from 'axios'
import { ICreatePost } from '../types/postsTypes'

export const postsApi = (instance: AxiosInstance) => ({
	async getPost() {
		const { data } = await instance.get('/posts')
		return data
	},
	async createPost(post: ICreatePost) {
		const { data } = await instance.post('/posts', post)
		return data
	},
	async setTags(tags: any, id: string) {
		const { data } = await instance.post(`/tags/${id}`, tags)
		return data
	},
	async getOnePost(id: string) {
		const { data } = await instance.get(`/posts/${id}`)
		return data
	},
	async deletePost(id: string) {
		await instance.delete(`/posts/${id}`)
		return id
	},
})
