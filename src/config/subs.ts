import { AxiosInstance } from 'axios'

export const subsApi = (instance: AxiosInstance) => ({
	async follow(id: string | undefined) {
		await instance.get(`/follow/${id}`)
	},
	async unFollow(id: string | undefined) {
		await instance.delete(`/follow/${id}/delete`)
	},
	async getNewFollowPosts(id: string | undefined) {
		const { data } = await instance.get(`/follow/${id}/new`)
		return data
	},
})
