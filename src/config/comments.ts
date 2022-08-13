import { AxiosInstance } from 'axios'
import { ICreateComment } from '../types/postsTypes'

export const commentsApi = (instance: AxiosInstance) => ({
	async getComms(id: string) {
		const { data } = await instance.get(`/comments`, { params: { id } })
		return data
	},
	async createComm(comment: ICreateComment, id: string) {
		const { data } = await instance.post(`/comm/${id}`, comment)
		return data
	},
})
