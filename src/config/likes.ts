import { AxiosInstance } from 'axios'

export const likeApi = (instance: AxiosInstance) => ({
	async giveLike(id: string) {
		await instance.get(`/likes/${id}`)
	},
	async delLike(id: string) {
		await instance.delete(`/likes/${id}`)
	},
})
